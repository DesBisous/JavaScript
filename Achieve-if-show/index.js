class Mvvm {
    constructor(options) {
        this.el = document.querySelector(options.el);
        this.data = options.data;
        this.methods = options.methods;
        this.dataPool = new Map(); // 用于收集依赖，不采用在 get 上进行闭包依赖绑定了
        this.init();
        console.log(this);
    }

    init() {
        this.observer();
        this.compile(this.el);
    }

    // observer
    observer() {
        const data = this.data;
        for (const key in data) {
            if (Object.hasOwnProperty.call(data, key)) {
                Object.defineProperty(this, key, {
                    get() {
                        return data[key];
                    },
                    set(newValue) {
                        data[key] = newValue;
                        for (const [dom, data] of this.dataPool) {
                            if (key === data.data) {
                                data.show = newValue,
                                this.handleDom(dom, this.dataPool)
                            }
                        }
                    }
                })
            }
        }
    }
    // compile
    compile(el) {
        const childNodes = el.childNodes;
        if (!childNodes.length) {
            return;
        }
        for (const children of childNodes) {
            if (children.nodeType === 1) {
                const vIf = children.getAttribute('v-if');
                const vShow = children.getAttribute('v-show');
                const vClick = children.getAttribute('@click');
                
                if(vIf) {
                    this.dataPool.set(children, {
                        type: 'if',
                        show: this.data[vIf],
                        data: vIf
                    })
                    this.initDom(children, this.dataPool);
                }
                if(vShow) {
                    this.dataPool.set(children, {
                        type: 'show',
                        show: this.data[vShow],
                        data: vShow
                    })
                    this.initDom(children, this.dataPool);
                }
                if(vClick) {
                    this.initEvent(vClick, children);
                }
            }
            children.childNodes.length && this.compile(children);
        }
    }

    initDom() {
        this.handleDom(...arguments);
    }

    handleDom(dom, dataPool) {
        const data = dataPool.get(dom);
        const type = data.type;
        switch (type) {
            case 'if':
                if (!data.comment) {
                    data.comment = document.createComment('v-if');
                }
                data.show ? data.comment.parentNode.replaceChild(dom, data.comment) : dom.parentNode.replaceChild(data.comment, dom);
                break;
            case 'show':
                data.show ? dom.style.display = 'block' : dom.style.display = 'none';
                break;
            default:
                break;
        }
    }

    // initEvent
    initEvent(method, dom) {
        dom.addEventListener('click', this.methods[method].bind(this), false);
    }
}