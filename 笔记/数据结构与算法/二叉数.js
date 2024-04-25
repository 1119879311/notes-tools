
// 二叉数数据
//1. 确定根节点后，下一个值比该节点小的话，就作为的左子节点，比该节点值大的话，成为右子节点
//2. 节点的数据属性可能有，左右子节点，父节点(除了根节点)，节点值
//实现节点对象
class Node{
    constructor(data){
        this.key = data;//节点值
        this.rightNode = null;//右子节点
        this.leftNode = null // 左子节点
    }
}
// 实现二叉数对象
class BinaryTree{
    constructor(arr){
        if(!Array.isArray(arr)||arr.length<1){
            throw("参数必须为数组且数组长度不能少于1")
        }
        this.data = arr
        this.rootNode = new Node(arr[0]);//初始化根节点
    }
    // 二叉排序
    sortNode(callback){
        let handleSortNode = function(node,key){
            //如果节点值比 入排值小的话，进左子节点
            if(node.key>key){
                //进行左子节点后要判断，左子节点是否存在，左右子节点，如果有继续递归判断，如果没有就直接成为左子节点
                if(node.leftNode==null){
                    node.leftNode = new Node(key)
                }else{
                    handleSortNode(node.leftNode,key)
                }
            }else {
                //右边同理
                if(node.rightNode==null){
                    node.rightNode = new Node(key)
                }else{
                    handleSortNode(node.rightNode,key)
                }
            }
        }
        for(let i = 1;i<this.data.length;i++){
            handleSortNode(this.rootNode,this.data[i])
        }
        callback&&callback(this.rootNode)
    }

    // 中序遍历
    orderNode(callback){
        let data = [];
        let orderRraversalNode = function(node){
            if(node.leftNode){
                orderRraversalNode(node.leftNode)
            }
            data.push(node.key)
            // callback&&callback(node.key)
            if(node.rightNode){
                orderRraversalNode(node.rightNode)
            }
        }
        orderRraversalNode(this.rootNode);
        callback&&callback(data)

    }
    // 找最小值，其实就是递归左子点击
    minNodeValue(callback){
        let minNode = this.rootNode.leftNode;
        while(minNode&&minNode.leftNode){
            minNode = minNode.leftNode
        }
        callback&&callback(minNode)
        return minNode.key;
    }
    // 找最大值
    maxNodeValue(callback){
        let maxNode = this.rootNode.rightNode;
        while(maxNode&&maxNode.rightNode){
            maxNode = maxNode.rightNode
        }
        callback&&callback(maxNode)
        return maxNode.key;
    }
}
var arr = [10,5,1,3,8,4,2,12,17,11,14,12,20]
// var arr = [];
let res = new BinaryTree(arr)
res.sortNode(function(data){
    console.log(data)
})
res.orderNode(function(data){
    console.log(data)

})
res.minNodeValue(function(data){
    console.log(data)

})
res.maxNodeValue(function(data){
    console.log(data)

})