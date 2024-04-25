class Node{
    constructor(data){
        this.data = data
        this.next = null;
        this.pre = null;
    }
}

class TwoWayList{
    constructor(){
        this.head = null;//头部节点
        this.fail = null;//尾部节点
        this.size = 0;
     
    }
    // 判断链表是否为空
    isEmpty(){
        return this.head===null?true:false
    }
    // 计算链表大小
    conputedSize(nodeList){   
        if(!nodeList) return 0;
        let index = 1;
        let rnode = nodeList
        while(rnode.next){
            index++
            rnode = rnode.next; 
        }
        return index;
    }
    // 获取链表大小
    getSize(){
        return this.size
    }
    // 向链表最后追加节点
    append(data){
        let node = new Node(data)
        if(this.isEmpty()){
           this.head = node
        }else{
            let rnode = this.head;
            while (rnode.next) {
                rnode = rnode.next
            }
            rnode.next = node
            node.pre = rnode
           
        }
        this.fail = node
        this.size++;
    }
    //向指定位置索引插入节点
    add(index,data){
        if(index<0||index>this.size){
            return false
        }
        if(index==this.size){
            return this.append(data)
        }
        let newNode = new Node(data)
        let findNode = this.findNode(index)
        if(index==0){
            findNode.pre =newNode
            newNode.next = findNode; 
            this.head = newNode
        }else{
            let oldPreNode = findNode.pre;
            oldPreNode.next = newNode;
            newNode.pre = oldPreNode;
            newNode.next = findNode;
            findNode.pre = newNode
        }
        this.size++;
    }
    //将一个链表合拼在另一个链表的指定位置(索引)
    addList(index,nodeList){
        if(index<0||index>this.size){
            return false
        }
        let addSize = this.conputedSize(nodeList.head)
        if(this.isEmpty()){
            this.head = nodeList.head;
            this.size = addSize;
            return true
        }
        let findNode = this.findNode(index)
        if(index==0){
            nodeList.fail.next = findNode;
            findNode.pre = nodeList.fail;
            this.head = nodeList.head;
        }else if(index===this.size){
            this.fail.next = nodeList.head;
            nodeList.head.pre = this.fail;
            this.fail = nodeList.fail;
        }else{
            let oldPreNode = findNode.pre;
            // 先接头
            oldPreNode.next = nodeList.head
            nodeList.head.pre = oldPreNode;
            //后接尾
            nodeList.fail.next = findNode
            findNode.pre = nodeList.fail
        }
        this.size=this.size+addSize;
    }
    // 删除指定位置的节点
    remove(index){
        let findNode = this.findNode(index)
        if(!findNode) return false
        let preNode = findNode.pre;
        let nextNode = findNode.next;
        if(preNode){
            preNode.next = nextNode;
        }
        if(nextNode){
            nextNode.pre = preNode
        }
        // 如果删除第一个，需要将header重新指向
        if(index==0){
            this.head = nextNode
        }
        // 如果删除最后一个，需要将fail重新指向
        if(index==this.size-1){
            this.fail = preNode
        }
        this.size--
        return true
    }
    // 根据起始索引删除指定一段节点（索引必须从0开始到size-1）
    removeList(startIndex,endIndex){
        if(this.isEmpty()) return true;//如果链表是空,则不处理

        if(startIndex<0||endIndex>=this.size) return false
     // 截取的四种情况：开头-最后， 开头-中间段， 中间段-中间段，中间段-最后
        let startIdx = startIndex||0;
        let endIdx = endIndex|| this.size-1;
        //开头-最后
        if(startIdx===0&&endIdx===this.size-1){
            this.head = null;
            this.fail = null;
            this.size = 0;
            return true
        }

        let startNode = this.findNode(startIdx)
        let endNode = this.findNode(endIdx)
        // 中间段
        if(startNode.pre&&endNode.next){
            startNode.pre.next = endNode.next;
            endNode.next.pre = startNode.pre
        }
        // 中间段-到最后
        if(startNode.pre&&!endNode.next){
            startNode.pre.next = endNode.next;
            this.fail = startNode.pre; 
        }
        //开始到中间段
        if(endNode.next&&!startNode.pre){
            endNode.next.pre = null;
            this.head = endNode.next;
        }
        // 重新计算链表大小
        this.size = this.conputedSize(this.head)
    }
    // 根据索引找到节点
    findNode(index){
        if(index<0||index>=this.size) return null
        let rnode = this.head;
        let rdx = 0
        while (rnode.next) {
            if(rdx===index) {
                return rnode
            }
            rnode = rnode.next
            rdx++;
        }
        if(index===this.size-1) return rnode
        return null

    }
}
let list = new TwoWayList()
let list2 = new TwoWayList()
list.append(1)
list.append(10)
list.append(11)

list2.append(5)
list2.append(4)
list.addList(list.size-1,list2)
console.log(list.head)
// console.log(list.fail)
console.log("-----------------",list.getSize())

// list.append(3)
// list.append(5)
// console.log(list.head)
list.removeList(0,2)
console.log(list.head)
// console.log(list.fail)
console.log("-----------------",list.getSize())
// console.log(list.findNode(0))
// console.log(list.findNode(1))
// console.log(list.findNode(2))
// list.add(0,10)
// list.add(1,8)
// console.log(list.remove(1))
// console.log(list.remove(1))

// console.log(list.head)
// console.log(list.fail)

// console.log(list.findNode(3))


