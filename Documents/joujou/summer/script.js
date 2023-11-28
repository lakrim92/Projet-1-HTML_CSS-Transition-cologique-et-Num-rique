const canvas = document.createElement("canvas")
const gl = canvas.getContext("webgl2")

document.body.innerHTML = ""
document.body.appendChild(canvas)
document.body.style = "margin: 0;overflow: hidden;"
canvas.style.width = "100%"
canvas.style.height = "auto"

const dpr = window.devicePixelRatio

function resize() {
    const {
        innerWidth: width,
        innerHeight: height
    } = window

    canvas.width = width * dpr
    canvas.height = height * dpr

    gl.viewport(0, 0, width * dpr, height * dpr)
}
window.onresize = resize

const vertexSource = `#version 300 es
    #ifdef GL_FRAGMENT_PRECISION_HIGH
    precision highp float;
    #else
    precision mediump float;
    #endif
    
    in vec4 position;
    
    void main(void) {
    	gl_Position = position;
    }
    `

const fragmentSource = `#version 300 es
    #ifdef GL_FRAGMENT_PRECISION_HIGH
    precision highp float;
    #else
    precision mediump float;
    #endif
    
    out vec4 fragColor;
    
    uniform vec2 resolution;
    uniform float time;
    
    #define T time

    mat2 rot(float a) {
	    float s=sin(a), c=cos(a);
	    return mat2(c,-s,s,c);
    }

    void main() {
      vec2 uv = (
      	gl_FragCoord.xy-.5*resolution
      )/min(resolution.x,resolution.y);
    
      uv *= 6.;
    
      vec3 col = vec3(0);
      float t = T, tt = t*.1, d = .0;
    
      uv *= rot(tt);
    
      for (int i = 0; i < 3; i++) {
      	float n = float(4-i);
      	uv -= vec2(sin(t),cos(t))*.02;
        d = length(uv);
        t -= .05;
    
    		vec2 p = uv;
        p += p*=1.618;
        p *= sin(d-t)*.5;
        p *= cos(d*.5-t)*.5;
    
        p += vec2(sin(tt),cos(tt))*.2;
    
        col[i] = .125/(abs(length(fract(p*2.-.5)-.5)*.5)*2.);
      }
    
      col /= d;
      col = mix(col,vec3(1.-length(fwidth(col))),-.125);
    	col.g -= .5;
      col.b -= .9;
      
      fragColor = vec4(col, 1);
    }
    `

function compile(shader, source) {
    gl.shaderSource(shader, source)
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error(gl.getShaderInfoLog(shader))
    }
}

let program

function setup() {
    const vs = gl.createShader(gl.VERTEX_SHADER)
    const fs = gl.createShader(gl.FRAGMENT_SHADER)

    compile(vs, vertexSource)
    compile(fs, fragmentSource)

    program = gl.createProgram()

    gl.attachShader(program, vs)
    gl.attachShader(program, fs)
    gl.linkProgram(program)

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.error(gl.getProgramInfoLog(program))
    }
}

let vertices, buffer

function init() {
    vertices = [
        -1., -1., 1.,
        -1., -1., 1.,
        -1., 1., 1.,
        -1., 1., 1.,
    ]

    buffer = gl.createBuffer()

    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW)

    const position = gl.getAttribLocation(program, "position")

    gl.enableVertexAttribArray(position)
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0)

    program.resolution = gl.getUniformLocation(program, "resolution")
    program.time = gl.getUniformLocation(program, "time")
}

function loop(now) {
    gl.clearColor(0, 0, 0, 1)
    gl.clear(gl.COLOR_BUFFER_BIT)
    gl.useProgram(program)
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    gl.uniform2f(program.resolution, canvas.width, canvas.height)
    gl.uniform1f(program.time, now * 1e-3)
    gl.drawArrays(gl.TRIANGLES, 0, vertices.length * .5)
    requestAnimationFrame(loop)
}

setup()
init()
resize()
loop(0)