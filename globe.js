/** Dependency-free interactive WebGL globe, with an opt-in accessible static fallback.
 * Terrain texture is generated from public-domain Natural Earth + ETOPO1 data.
 * Pins are editorial geography anchors only — NOT claims of operating programs.
 */
export class EarthGlobe {
  constructor(node, options={}) {
    this.node=node;
    this.options=options;
    this.yaw=(options.yaw??1.08);
    this.tilt=(options.tilt??-0.13);
    this.zoom=options.zoom??.91;
    this.autoRotate=true;
    this.dragging=false;
    this.lastTime=0;
    this.dragDistance=0;
    this.pins=[];
    this.disposed=false;
    this.muted=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    this.create();
  }
  create(){
    this.node.innerHTML='<div class="earth-glow" aria-hidden="true"></div><canvas class="earth-canvas" aria-label="Interactive rotating Earth globe. Drag to rotate, scroll to zoom." role="img"></canvas><div class="earth-pins"></div>';
    this.canvas=this.node.querySelector('canvas');
    this.pinLayer=this.node.querySelector('.earth-pins');
    this.gl=this.canvas.getContext('webgl',{antialias:true,alpha:true,preserveDrawingBuffer:false});
    if(!this.gl){ this.initSoftware(); }
    else try { this.initGL(); }catch(e){console.warn('Using Canvas 2D fallback:',e);this.gl=null;this.initSoftware();}
    this.onPointerDown=e=>{ if(e.target.closest('button'))return;this.dragging=true;this.autoRotate=false;this.dragDistance=0;this.startX=e.clientX;this.startY=e.clientY;this.pointerX=e.clientX;this.pointerY=e.clientY;this.canvas.setPointerCapture?.(e.pointerId);this.node.classList.add('is-dragging')};
    this.onPointerMove=e=>{if(!this.dragging)return;const dx=e.clientX-this.pointerX,dy=e.clientY-this.pointerY;this.dragDistance+=Math.abs(dx)+Math.abs(dy);this.yaw+=dx*.0065;this.tilt=Math.max(-.75,Math.min(.75,this.tilt-dy*.004));this.pointerX=e.clientX;this.pointerY=e.clientY;};
    this.onPointerUp=()=>{this.dragging=false;this.node.classList.remove('is-dragging')};
    this.onWheel=e=>{if(e.ctrlKey||e.metaKey)return;e.preventDefault();this.zoom=Math.max(.70,Math.min(1.13,this.zoom+(e.deltaY<0?.045:-.045)));this.autoRotate=false;};
    this.canvas.addEventListener('pointerdown',this.onPointerDown);
    this.canvas.addEventListener('pointermove',this.onPointerMove);
    this.canvas.addEventListener('pointerup',this.onPointerUp);
    this.canvas.addEventListener('pointercancel',this.onPointerUp);
    this.canvas.addEventListener('wheel',this.onWheel,{passive:false});
    this.onVisible=entries=>{this.visible=entries[0]?.isIntersecting};
    this.observer=new IntersectionObserver(this.onVisible,{threshold:.03});this.observer.observe(this.node);this.visible=true;
    this.onResize=()=>this.resize();window.addEventListener('resize',this.onResize,{passive:true});
    this.resize();this.lastTime=performance.now();this.frame=requestAnimationFrame(t=>this.render(t));
  }
  initSoftware(){
    // CPU globe uses true orthographic sphere projection and reprojects the
    // Earth map as yaw/tilt change. Remains draggable/zoomable without WebGL.
    this.software=true;
    this.softwareCtx=this.canvas.getContext('2d',{alpha:true,willReadFrequently:true});
    this.node.classList.add('earth-software');
    const image=new Image();
    image.onload=()=>{
      if(this.disposed)return;
      const scratch=document.createElement('canvas');scratch.width=image.naturalWidth;scratch.height=image.naturalHeight;
      let cx=scratch.getContext('2d',{willReadFrequently:true});cx.drawImage(image,0,0);
      this.terrain=cx.getImageData(0,0,scratch.width,scratch.height).data;
      this.terrainW=scratch.width;this.terrainH=scratch.height;
      this.softwareDirty=true;
    };
    image.src='assets/earth-terrain.webp';
  }
  renderSoftware(){
    if(!this.softwareCtx||!this.terrain)return;
    const N=this.canvas.width;
    if(!N)return;
    const cx=this.softwareCtx;const out=cx.createImageData(N,N),pix=out.data;
    const tex=this.terrain, W=this.terrainW,H=this.terrainH;
    const radius=(N/2)*this.zoom;
    const cy=Math.cos(this.yaw),sy=Math.sin(this.yaw),ct=Math.cos(this.tilt),st=Math.sin(this.tilt);
    const size=N/2;
    for(let j=0;j<N;j++){
      const v=-(j+.5-size)/radius;
      if(Math.abs(v)>=1)continue;
      const vv=v*v;
      for(let i=0;i<N;i++){
        const u=(i+.5-size)/radius;
        const d=u*u+vv;
        if(d>=1)continue;
        const z=Math.sqrt(1-d);
        // Undo tilt, then yaw, to locate the visible pixel on Earth.
        const gy=v*ct+z*st;
        const gz=-v*st+z*ct;
        const gx=u*cy-gz*sy;
        const zz=u*sy+gz*cy;
        const lon=Math.atan2(gx,zz),lat=Math.asin(Math.max(-1,Math.min(1,gy)));
        let ti=Math.floor((lon/Math.PI*.5+.5)*W);
        if(ti<0)ti+=W;if(ti>=W)ti-=W;
        let tj=Math.max(0,Math.min(H-1,Math.floor((.5-lat/Math.PI)*H)));
        const ix=(tj*W+ti)*4,ox=(j*N+i)*4;
        const lighting=.46+.58*Math.max(0,u*(-.43)+v*.43+z*.79);
        const rim=Math.pow(1-z,2.1);
        pix[ox]=Math.min(255,tex[ix]*lighting+rim*8);
        pix[ox+1]=Math.min(255,tex[ix+1]*lighting+rim*32);
        pix[ox+2]=Math.min(255,tex[ix+2]*lighting+rim*52);
        pix[ox+3]=Math.floor(255*Math.min(1,Math.sqrt(Math.max(0,1-d))*12));
      }
    }
    cx.putImageData(out,0,0);
  }
  shader(type,src){const gl=this.gl,s=gl.createShader(type);gl.shaderSource(s,src);gl.compileShader(s);if(!gl.getShaderParameter(s,gl.COMPILE_STATUS))throw new Error(gl.getShaderInfoLog(s));return s;}
  initGL(){
    const gl=this.gl;
    const vs=`attribute vec3 aPos;attribute vec2 aUv;uniform float uYaw;uniform float uTilt;uniform float uZoom;varying vec2 vUv;varying vec3 vNormal;void main(){float cy=cos(uYaw),sy=sin(uYaw),ct=cos(uTilt),st=sin(uTilt);vec3 p=vec3(aPos.x*cy+aPos.z*sy,aPos.y,-aPos.x*sy+aPos.z*cy);p=vec3(p.x,p.y*ct-p.z*st,p.y*st+p.z*ct);vNormal=p;vUv=aUv;gl_Position=vec4(p.xy*uZoom,-p.z*.65,1.0);}`;
    const fs=`precision mediump float;uniform sampler2D uTex;uniform float uTime;varying vec2 vUv;varying vec3 vNormal;void main(){vec3 n=normalize(vNormal);vec3 base=texture2D(uTex,vec2(vUv.x,1.0-vUv.y)).rgb;float sun=max(dot(n,normalize(vec3(-.45,.45,.82))),0.0);float shade=.54+.54*sun;float rim=pow(1.0-max(n.z,0.0),2.7);vec3 lit=base*shade+vec3(.08,.24,.35)*rim*.55;float cloud=pow(max(sin(vUv.x*113.0+sin(vUv.y*51.0)*4.0)*sin(vUv.y*87.0+vUv.x*9.0),0.0),11.0)*.115;lit=mix(lit,vec3(.88,.94,1.0),cloud*sun);gl_FragColor=vec4(lit,1.0);}`;
    const p=gl.createProgram();gl.attachShader(p,this.shader(gl.VERTEX_SHADER,vs));gl.attachShader(p,this.shader(gl.FRAGMENT_SHADER,fs));gl.linkProgram(p);if(!gl.getProgramParameter(p,gl.LINK_STATUS))throw new Error(gl.getProgramInfoLog(p));gl.useProgram(p);this.program=p;
    const verts=[],uvs=[],inds=[],seg=96,rings=64;
    for(let j=0;j<=rings;j++){let lat=Math.PI/2-Math.PI*j/rings;for(let i=0;i<=seg;i++){let lon=-Math.PI+2*Math.PI*i/seg;let x=Math.cos(lat)*Math.sin(lon),y=Math.sin(lat),z=Math.cos(lat)*Math.cos(lon);verts.push(x,y,z);uvs.push(i/seg,j/rings);}}
    for(let j=0;j<rings;j++)for(let i=0;i<seg;i++){let a=j*(seg+1)+i,b=a+seg+1;inds.push(a,b,a+1,b,b+1,a+1);}
    this.count=inds.length;
    function buffer(attribute,size,data){const loc=gl.getAttribLocation(p,attribute);const b=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,b);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(data),gl.STATIC_DRAW);gl.enableVertexAttribArray(loc);gl.vertexAttribPointer(loc,size,gl.FLOAT,false,0,0);return b;}
    this.posBuffer=buffer('aPos',3,verts);this.uvBuffer=buffer('aUv',2,uvs);
    this.indexBuffer=gl.createBuffer();gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,this.indexBuffer);gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,new Uint16Array(inds),gl.STATIC_DRAW);
    this.locations={yaw:gl.getUniformLocation(p,'uYaw'),tilt:gl.getUniformLocation(p,'uTilt'),zoom:gl.getUniformLocation(p,'uZoom'),time:gl.getUniformLocation(p,'uTime')};
    const tex=gl.createTexture();gl.bindTexture(gl.TEXTURE_2D,tex);gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,1,1,0,gl.RGBA,gl.UNSIGNED_BYTE,new Uint8Array([5,27,56,255]));gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.LINEAR_MIPMAP_LINEAR);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.LINEAR);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE);
    this.texture=tex;let im=new Image();im.onload=()=>{if(this.disposed)return;gl.bindTexture(gl.TEXTURE_2D,tex);gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,gl.RGBA,gl.UNSIGNED_BYTE,im);gl.generateMipmap(gl.TEXTURE_2D);};im.src='assets/earth-terrain.webp';
    gl.enable(gl.DEPTH_TEST);gl.depthFunc(gl.LEQUAL);
  }
  setPins(pins){this.pins=pins;this.pinLayer.innerHTML='';for(const pin of pins){const button=document.createElement('button');button.type='button';button.className='globe-pin';button.setAttribute('aria-label',`Explore ${pin.label}`);button.title=pin.label;button.innerHTML='<span></span>';button.addEventListener('click',()=>{this.focus(pin.lat,pin.lng);this.options.onPin?.(pin.id)});this.pinLayer.appendChild(button);pin.element=button;}this.updatePins();}
  focus(lat,lng){const target=( -lng*Math.PI/180);const current=this.yaw;let delta=((target-current+Math.PI)%(2*Math.PI)+2*Math.PI)%(2*Math.PI)-Math.PI;this.yawTarget=current+delta;this.tiltTarget=-lat*Math.PI/180*.62;this.autoRotate=false;}
  zoomBy(d){this.zoom=Math.max(.7,Math.min(1.13,this.zoom+d));this.autoRotate=false;}
  toggleRotation(){this.autoRotate=!this.autoRotate;return this.autoRotate;}
  updatePins(){let box=this.node.getBoundingClientRect();const r=Math.min(box.width,box.height)/2;this.pins.forEach(p=>{if(!p.element)return;let lat=p.lat*Math.PI/180,lng=p.lng*Math.PI/180;let x=Math.cos(lat)*Math.sin(lng+this.yaw),z=Math.cos(lat)*Math.cos(lng+this.yaw),y=Math.sin(lat);let ct=Math.cos(this.tilt),st=Math.sin(this.tilt),py=y*ct-z*st,pz=y*st+z*ct;const visible=pz>.12;p.element.style.opacity=visible?'1':'0';p.element.style.pointerEvents=visible?'auto':'none';p.element.style.left=`${box.width/2+x*r*this.zoom}px`;p.element.style.top=`${box.height/2-py*r*this.zoom}px`;});}
  resize(){const r=this.node.getBoundingClientRect();if(this.software){const n=Math.max(230,Math.min(385,Math.round(Math.min(r.width,r.height)*.73)));this.canvas.width=n;this.canvas.height=n;this.canvas.style.width='100%';this.canvas.style.height='100%';return;}if(!this.gl)return;const dpr=Math.min(window.devicePixelRatio||1,2);const w=Math.round(r.width*dpr),h=Math.round(r.height*dpr);if(!w||!h)return;this.canvas.width=w;this.canvas.height=h;this.canvas.style.width='100%';this.canvas.style.height='100%';this.gl.viewport(0,0,w,h);}
  render(t){if(this.disposed)return;this.frame=requestAnimationFrame(tt=>this.render(tt));if((!this.gl&&!this.software)||!this.visible)return;const dt=Math.min(.05,(t-this.lastTime)/1000||0);this.lastTime=t;
    if(!this.dragging){if(this.yawTarget!==undefined){const dist=this.yawTarget-this.yaw;this.yaw+=dist*Math.min(1,dt*4);if(Math.abs(dist)<.003)this.yawTarget=undefined;}else if(this.autoRotate&&!this.muted)this.yaw+=dt*.075;if(this.tiltTarget!==undefined){const d=this.tiltTarget-this.tilt;this.tilt+=d*Math.min(1,dt*4);if(Math.abs(d)<.003)this.tiltTarget=undefined;}}
    if(this.software){const changed=this.softwareDirty||this.lastRenderedYaw===undefined||Math.abs(this.yaw-this.lastRenderedYaw)>.004||Math.abs(this.tilt-(this.lastRenderedTilt??0))>.004||Math.abs(this.zoom-(this.lastRenderedZoom??0))>.004;if(changed&&(!this.lastSoft||t-this.lastSoft>=85)){this.renderSoftware();this.updatePins();this.lastSoft=t;this.lastRenderedYaw=this.yaw;this.lastRenderedTilt=this.tilt;this.lastRenderedZoom=this.zoom;this.softwareDirty=false;}return;}
    const gl=this.gl;gl.clearColor(0,0,0,0);gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);gl.useProgram(this.program);gl.uniform1f(this.locations.yaw,this.yaw);gl.uniform1f(this.locations.tilt,this.tilt);gl.uniform1f(this.locations.zoom,this.zoom);gl.uniform1f(this.locations.time,t/1000);
    gl.bindBuffer(gl.ARRAY_BUFFER,this.posBuffer);let pos=gl.getAttribLocation(this.program,'aPos');gl.vertexAttribPointer(pos,3,gl.FLOAT,false,0,0);
    gl.bindBuffer(gl.ARRAY_BUFFER,this.uvBuffer);let uv=gl.getAttribLocation(this.program,'aUv');gl.vertexAttribPointer(uv,2,gl.FLOAT,false,0,0);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,this.indexBuffer);gl.bindTexture(gl.TEXTURE_2D,this.texture);gl.drawElements(gl.TRIANGLES,this.count,gl.UNSIGNED_SHORT,0);
    this.updatePins();
  }
  destroy(){this.disposed=true;cancelAnimationFrame(this.frame);this.observer?.disconnect();window.removeEventListener('resize',this.onResize);this.canvas?.removeEventListener('pointerdown',this.onPointerDown);this.canvas?.removeEventListener('pointermove',this.onPointerMove);this.canvas?.removeEventListener('pointerup',this.onPointerUp);this.canvas?.removeEventListener('pointercancel',this.onPointerUp);this.canvas?.removeEventListener('wheel',this.onWheel);if(this.gl){this.gl.deleteBuffer(this.posBuffer);this.gl.deleteBuffer(this.uvBuffer);this.gl.deleteBuffer(this.indexBuffer);this.gl.deleteTexture(this.texture);this.gl.deleteProgram(this.program)}this.node.innerHTML='';}
}
