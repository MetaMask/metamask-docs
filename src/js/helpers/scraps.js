var Scraps = (function () {
    function Scraps() {
        this.kernels = [];
    }
    Scraps.prototype.register = function (kernel) {
        this.kernels.push(kernel);
        return this;
    };
    Scraps.prototype.executeStack = function (flush) {
        console.log("EXECUTE STACK");
        this.kernels.forEach(function (k) {
            console.log("kernel");
            k.evaluate(flush);
        });
    };
    return Scraps;
}());
export { Scraps };
var Sandbox = (function () {
    function Sandbox(code) {
        var sandbox = this;
        this.input = code;
        this.element = document.createElement('textarea');
        this.element.className = "code-input-";
        this.element.value = code;
        this.element.style.width = "100%";
        this.element.rows = 8;
        this.element.spellcheck = false;
        this.output_element = document.createElement('pre');
        this.output_element.className = "code-output-";
        this.output_code = document.createElement('code');
        this.output_code.className = "language-javascript";
        this.output_element.appendChild(this.output_code);
        this.element.onscroll = function () {
            sandbox.output_element.scrollTop = sandbox.element.scrollTop;
            sandbox.output_element.scrollLeft = sandbox.element.scrollLeft;
        };
        this.element.onkeydown = function (key) {
            var input = sandbox.element, selStartPos = input.selectionStart, inputVal = input.value;
            if (key.keyCode === 9) {
                input.value = inputVal.substring(0, selStartPos) + "    " + inputVal.substring(selStartPos, input.value.length);
                input.selectionStart = selStartPos + 4;
                input.selectionEnd = selStartPos + 4;
                key.preventDefault();
            }
            window.setTimeout(function () {
                sandbox.renderCodeHighlighting();
            }, 1);
        };
        this.element.onkeyup = function () {
            context.executeStack(false);
            window.setTimeout(function () {
                sandbox.renderCodeHighlighting();
            }, 1);
        };
    }
    Sandbox.prototype.renderCodeHighlighting = function () {
        this.element.style.height = "5px";
        this.element.style.height = (this.element.scrollHeight) + "px";
        this.input = this.element.value;
        var v = this.input.replace(/&/g, "&amp;").replace(/</g, "&lt;")
            .replace(/>/g, "&gt;") + "\n";
        this.output_code.innerHTML = v;
        window['Prism'].highlightAll();
    };
    Sandbox.prototype.getElement = function () {
        var el = document.createElement('div');
        el.className = 'code';
        el.appendChild(this.element);
        el.appendChild(this.output_element);
        return el;
    };
    Sandbox.prototype.getCompiled = function () {
        var build_variables = "\n\t\tfunction makeIdentifiableProperty(i){\n\t\t\treturn typeof i + (!!i?i.toString():\"unknown\");\n\t\t}\n\t\tlet utils = new KernelUtils(kernel);\n\t\tlet p = utils.p.bind(utils);\n\t\tlet h1 = utils.h1.bind(utils);\n\t\tlet h2 = utils.h2.bind(utils);\n\t\tlet print = kernel.print.bind(kernel)\n\t\t";
        return build_variables + " " + this.input.replace(/;/g, ";") + ";";
    };
    Sandbox.prototype.getLambda = function () {
        var args = "kernel";
        return new Function(args, this.getCompiled());
    };
    return Sandbox;
}());
export { Sandbox };
var Kernel = (function () {
    function Kernel(context) {
        this.context = context.register(this);
        this.area_control = document.createElement('div');
        this.area_working = document.createElement('div');
        this.area_render = document.createElement('div');
        this.area_console = document.createElement('div');
        this.utils = new KernelUtils(this);
    }
    Kernel.prototype.print = function (element) {
        this.area_render.appendChild(element);
    };
    Kernel.prototype.load = function (element) {
        this.sandbox = new Sandbox(element.innerHTML);
        element.innerHTML = "";
        var control_bar = document.createElement('div');
        control_bar.className = 'control_bar';
        control_bar.innerText = '';
        this.area_control.appendChild(control_bar);
        this.area_working.appendChild(this.sandbox.getElement());
        element.appendChild(this.area_render);
        element.appendChild(this.area_working);
        element.appendChild(this.area_control);
        element.appendChild(this.area_console);
        this.sandbox.renderCodeHighlighting();
    };
    Kernel.prototype.getSandbox = function () {
        return this.sandbox;
    };
    Kernel.prototype.onlyIfChanges = function (old, n) {
        return (old !== n);
    };
    Kernel.prototype.evaluate = function (flush) {
        var self = this;
        if (flush) {
            window.clearTimeout(this.debounce);
            this.debounce = null;
        }
        else {
            window.clearTimeout(this.debounce);
            self.debounce = window.setTimeout(function () {
                self.evaluate(true);
            }, 10);
            return;
        }
        try {
            var fn = this.getSandbox().getLambda();
            try {
                this.area_console.innerText = '';
                this.area_render.innerHTML = "";
                this.artifacts = fn(this);
                if (this.artifacts !== undefined && JSON.stringify(this.artifacts) !== "{}" && JSON.stringify(this.artifacts) !== "undefined") {
                    if (typeof this.artifacts === 'string' || typeof this.artifacts === 'number') {
                        if (self.onlyIfChanges(this.area_console.innerHTML, this.artifacts)) {
                            this.area_console.innerHTML = this.artifacts.toString();
                        }
                    }
                    else {
                        if (self.onlyIfChanges(this.area_console.innerHTML, JSON.stringify(this.artifacts))) {
                            this.area_console.innerHTML = "";
                            window['jsonView'].format(JSON.stringify(this.artifacts), this.area_console);
                        }
                    }
                }
            }
            catch (e) {
                if (self.onlyIfChanges(this.area_console.innerHTML, "Runtime Error: " + JSON.stringify(e.message))) {
                    this.area_console.innerHTML = "Runtime Error: " + JSON.stringify(e.message);
                }
            }
        }
        catch (e) {
            if (self.onlyIfChanges(this.area_console.innerHTML, "Compilation Error: " + JSON.stringify(e.message))) {
                this.area_console.innerHTML = "Compilation Error: " + JSON.stringify(e.message);
            }
        }
    };
    return Kernel;
}());
export { Kernel };
var KernelUtils = (function () {
    function KernelUtils(kernel) {
        this.kernel = kernel;
    }
    KernelUtils.prototype.p = function (string) {
        var el = document.createElement('p');
        el.innerHTML = string;
        return el;
    };
    KernelUtils.prototype.h1 = function (string) {
        var el = document.createElement('h1');
        el.innerHTML = string;
        return el;
    };
    KernelUtils.prototype.h2 = function (string) {
        var el = document.createElement('h2');
        el.innerHTML = string;
        return el;
    };
    KernelUtils.prototype.h3 = function (string) {
        var el = document.createElement('h3');
        el.innerHTML = string;
        return el;
    };
    return KernelUtils;
}());
export { KernelUtils };
var context = new Scraps();
var elements = document.getElementsByClassName('redact-js');
for (var i = 0; i < elements.length; i++) {
    var el = elements[i];
    var kernel = new Kernel(context);
    kernel.load(el);
}
context.executeStack(true);
//# sourceMappingURL=scraps.js.map