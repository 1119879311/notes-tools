// 约瑟夫环问题：
//问题描述：N个人围成一圈，从第一个(K=1)开始报数，第M个将被杀掉，最后剩下一个，其余人都将被杀掉。
//例如N=6，M=5，被杀掉的顺序是：5，4，6，2，3,最后就剩下1
/**
 * 
 * @param {*} n : 总数 n
 * @param {*} k : 起始位置，默认从第一个k=1开始，每一轮结束，下一位从1开始算起
 * @param {*} m ：第m 个为一次结束
 * 
 */
//1,2,3,4,5,6 =>5  (0 + 5 -1) % 6 =>4(余数,索引)  size--=>6-1 =5   value=> 5
//1,2,3,4,6    (4 + 5 -1) % 5 =>3(余数，索引)  size--=>5-1 =4    value=> 4
//1,2,3,6    (3 + 5 -1) % 4 =>3(余数，索引)  size--=>4-1 =3     value=> 6
//1,2,3    (3 + 5 -1) % 3 =>1(余数，索引)  size--=>3-1 =2     value=> 2
//1,3    (1 + 5 -1) % 2 =>1(余数，索引)  size--=>2-1 =1     value=> 3

function YueSeFuHuan(n=39,k=1,m=3){
   let arr = Array.from(new Array(n),(_,v)=>v+1);

   let index = k-1;//k默认为1，即从第一个人开始，索引为从0开始，所以要减一
   let size = n;
   while(size>1){
    index = (index + m -1) % size;//关键是这个取模,解决如何找到要删除的那个值的索引,这里 还有减一，因为是删除的是索引
    let delRes = arr.splice(index,1)
    console.log( '=>'+delRes)
    size--
   }
   console.log("arr",arr,"lastIndex",index,"lastdata:"+arr[0])
}
console.time("YueSeFuHuan")
YueSeFuHuan(6,1,5)
console.timeEnd('YueSeFuHuan')



class TNode{
    constructor(data){
        this.data = data;
        this.next = null
    }
}
class LoopOneWayList{
    constructor(n=39,k=1,m=3){
        this.n = n;
        this.k = k;
        this.m = m;
        this.init();
    }
    init(){
        let headNode = new TNode(1)
        let currentNode = headNode;
        let p = headNode;//k默认开始为首节点
        for(let i=2;i<=this.n;i++){
            let newNode = new TNode(i);
            currentNode.next = newNode;//把当前的节点的下一节点指向新增的节点
            currentNode = newNode;// 把新增的节点重新指向当前节点，依次循环添加节点
            if(i===this.k){//这里是计算出第一次从k(k=1)个开始
                p = currentNode
            }
        }
        currentNode.next = headNode;//最后一个节点的下一个节点指向头节点(首尾相接，形成环形)
        while(p.next!=p){
            for(let i=1;i<this.m-1;i++){
                p = p.next;
            }
            //当 指针已经移动了m次，将改节点移除
            console.log("=>"+p.next.data) 
            p.next = p.next.next;
            p = p.next;
        }
        console.log(p.next==p)
        console.log("last=>:"+p.data) 
    }

}
//1234 =>4 123=>3 12=>1 2=>2
// console.time("LoopOneWayList")
// let listNode = new LoopOneWayList(41,1,3)
// console.timeEnd('LoopOneWayList')

