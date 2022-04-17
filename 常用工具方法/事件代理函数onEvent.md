```javascript

function onEven(eventType, parntNode, childNode, fn, bool) {
    console.log("parntNode", parntNode)
    //没有委托
    let trifn;
    if (typeof childNode == 'function') {
        bool = fn;
        trifn = childNode
    } else {
        //有委托
        trifn = function (e) {
            let target = e.target
            if (target.matches(childNode)) {
                target['mapTarget'] = this;
                typeof fn == "function" && fn.apply(target, arguments)
            }
        }
    }
    if (parntNode.nodeType == 1) {
        parntNode.addEventListener(eventType, trifn, bool || false)
    } else {
        document.querySelectorAll(parntNode).forEach(function (itme) {
            itme.addEventListener(eventType, trifn, bool || false)
        })
    }

}

```

