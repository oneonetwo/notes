### 数据结构和算法
- [怎么才算真正掌握了一个数据结构或算法？](https://mp.weixin.qq.com/s/t8z4KQMrTrR3NljtWJm2zg)
- 数据结构是为算法服务的，算法要作用在特定的数据结构之上。
- 10 个数据结构：数组、链表、栈、队列、散列表、二叉树、堆、跳表、图、Trie 树；10 个算法：递归、排序、二分查找、搜索、哈希算法、贪心算法、分治算法、回溯算法、动态规划、字符串匹配算法。
- 时间复杂度 表示代码执行时间随数据规模增长的变化趋势，所以，也叫作渐进时间复杂度
  > 1. O(1) O(n) O(n+m) O(logn) O(n*m)  O(n2)  
- 空间复杂度 表示算法的存储空间与数据规模之间的增长关系，就是渐进空间复杂度

### 算法
#### 1. AC自动机（tire树 KMP算法 bfs）
- 跟刚刚构建失败指针的分析类似，for 循环依次遍历主串中的每个字符，for 循环内部最耗时的部分也是 while 循环，而这一部分的时间复杂度也是 O(len)，所以总的匹配的时间复杂度就是 O(n*len)。因为敏感词并不会很长，而且这个时间复杂度只是一个非常宽泛的上限，实际情况下，可能近似于 O(n)，所以 AC 自动机做敏感词过滤，性能非常高。
- ac自动机是著名的多模式匹配算法，建立在字典树，KMP算法之上
  > 1. 字典树
  >> - Trie 树构建的时间复杂度是 O(m*len)，其中 len 表示敏感词的平均长度，m 表示敏感词的个数。
  >> - 单词查找树，Trie树，是一种树形结构，根节点不包含字符，除根节点外每一个节点都只包含一个字符； 从根节点到某一节点，路径上经过的字符连接起来，为该节点对应的字符串；  
  > 2. KMP算法,字符串匹配算法 时间复杂度O(m+n)
  >> - 核心是利用匹配失败后的信息，尽量减少模式串与主串的匹配次数以达到快速匹配的目的。
  >> - 根据模式串最长公共前后缀，算出next数组，减少算法中i回溯所进行的无谓操作
- 构建分为三个步骤
  > 1. 将多个模式串构建成 Trie 树；
  > 2. 在 Trie 树上构建失败指针(bfs广度优先，给每个节点添加back节点);
  > 3. 模式匹配
  ```javascript
  //构建字典树
    function buildTree(words){
        words = dedupAndSort(words);
        let root = {
            child: {},      //子节点
            val: null,      //节点值
            back: null,     //fail之后的回溯节点
            parent: null,   //父节点
            accept: []      //都是是单词的结尾
        }
        //添加每一个word到root
        for(let word of words){
            addWord(root, p);
        }

        //添加fail之后的回溯节点
        fallbackAll(root);
        return root;
    }
    function dedupAndSort(words) {
        // 砍掉空格
        words = words.map(function (word) {
            return word.trim()
        });
        // 滤掉空串
        words = words.filter(function (word) {
            return word.length > 0
        });
        var seen = {};
        var out = [];
        for (var i = 0; i < words.length; i++) {
            var word = words[i];
            if (!seen[word]) {
                seen[word] = true;
                out[out.length] = word;
            }
        }
        return out.sort();
    }
    //添加一个模式串到字典树
    function addWord(root, word){
        let current = root;
        for(let i=0;i<word.length;i++){
            let w = word[i];
            let child = current.child[w];
            if(!child){
                current.child[w] = {
                    child: [],
                    val: w,
                    back: root,
                    parent: current,
                    accpet: []
                }
            }
            current = current.child[w];
        }
        //标记当前单词的长度
        current.accpet = [word.length];
    }
    //添加回溯，广度优先遍历给每个节点添加back节点
    function fallbackAll(root){

        let curExpands = Object.values(root);
        while(curExpands.length>0){
            let nextExpands = [];//下一层的全部节点
            for(let node of curExpands){
                nextExpands.push(...Object.values(node.child));//添加当前节点的所有的子节点
                let parent = node.parent;//当前节点的父节点
                let back = parent.back;//父节点的back;
                while(back !== null){
                    let child = back.child[node.val];//匹配父节点跳跃节点的子节点
                    if(child){
                        node.back = child;
                        break;
                    }
                    back = back.back; //相当于 再找上一级
                }
            }

            curExpands = nextExpands; //下一层赋值给cur 
        }   

    }

    //添加单个回溯，新加的一个单词的back;
    function fallbackOne(root, word){
        //首个个节点不用找，
        let node = root.child[word[0]];
        for(let i=1; i<word.length; i++){
            let w = word[i];                
            let parent = node.parent;
            let back = parent.back;
            while(back != null){
                let child = back.child[node.val];
                if(child){
                    node.back = child;
                    break;
                }
                back = back.back;
            }
            node = node.child[w];
        }
    }
    class FastScanner{
        constructor(words){
            this.root = buildTree(words);
        }
        add(){
            var word = word.trim();
            if(word.length === 0){
                return;
            }
            //添加单词到字典树
            addWord(this.root, word);
            //新添加的单词的fail
            fallback(this.root, word);
        }
        search(content){
            let offsetWords = [];
            let current = this.root;
            for(let i=0;i<content.length;i++){
                let w = content[i];
                let next = current.child[w];
                if(!next){
                    let back = current.back;
                    while(back!==null){
                        next = back.child[w];
                        if(next){
                            break;
                        }
                        back = back.back;
                    }
                    if(back === null) {
                        current = this.root;
                        continue;
                    }               
                }
                if(next){
                    if(next.accpet.length>0){
                        let len = next.accpet[0];
                        let offset = i+1-len;
                        let word = content.substr(offset, len);
                        offsetWords.push([offset, word]);
                    }
                    current = next;
                }
            }
            return offsetWords;
        }
    }  
    let fast = new FastScanner(['her','she','his','hi']);
    //{root: {child: {…}, val: null, back: null, parent: null, accept: Array(0)}}
    fast.search('ahisher')
    //[[1, "hi"], [1, "his"], [3, "she"],[4, "her"]]
  ```
  
### 数据结构
#### 1. 队列（先进先出）
- 队列是一种特殊的线性表，特殊之处在于它只允许在表的前端（front）进行删除操作，而在表的后端（rear）进行插入操作，和栈一样，队列是一种操作受限制的线性表。进行插入操作的端称为队尾，进行删除操作的端称为队头。
#### 2. 链表
- 链表由一系列结点组成，结点可以在运行时动态生成。每个结点包括两个部分：一个存储当前的数据，另一个是指向下一个节点。
    ```javascript
        //实现一个链表
        class Node{
            constructor(value){
                this.value = value;
                this.next = null;
            }
        }  
        class Chain{
            constructor(arr){
                let head = new Node(arr.shift());
                let cur = head;  
                for(let k of arr){     
                    cur.next = new Node(k);
                    cur = cur.next;
                }
                return head;
            }
        }

    ```
#### 3. 栈（后进先出）
- 栈（stack）又名堆栈，它是一种运算受限的线性表。限定仅在表尾进行插入和删除操作的线性表。这一端被称为栈顶，相对地，把另一端称为栈底。
#### 4. 堆
- 堆中某个节点的值总是不大于或不小于其父节点的值；堆总是一棵完全二叉树；将根节点最大的堆叫做最大堆或大根堆；
#### 5. 二叉树
- 每个结点最多有两个子树的树结构。通常子树被称作“左子树”（left subtree）和“右子树”（right subtree）      
    ```javascript
        //实现一个二叉树
        class Node{
            constructor(val){
                this.val = val;
                this.left = this.right = null;
            }
        }

        class BTree{
            constructor(arr){
                let nodeList = [];
                for(let [i,k] of arr.entries()){
                    let node = new Node(k)
                    nodeList.push(node);
                    if(i === 0 ){ continue };
                    let parent = nodeList[parseInt((i-1)/2)];
                    if(!parent.left){
                        parent.left = node;
                    }else{
                        parent.right = node;
                    }

                }
                return nodeList.shift();
            }
        }

        var bt = new BTree([6,12,3,67,89,6,3,7,9,8]);
        
    ```
#### 6. tire树
- 单词查找树，Trie树，是一种树形结构，根节点不包含字符，除根节点外每一个节点都只包含一个字符； 从根节点到某一节点，路径上经过的字符连接起来，为该节点对应的字符串；  

### 基础排序
  ```javascript
      //冒泡
      //它重复地走访过要排序的元素列，依次比较两个相邻的元素
      var arr = [22,45,3,554,78,0];
      function bubbleSort(arr){
          for(let i=0;i<arr.length;i++){
              for(let j=0;j<arr.length-i;j++){
                  if(arr[j+1]>arr[j]){
                      let temp = arr[j+1];
                      arr[j+1] = arr[j];
                      arr[j] = temp;
                  }
              }
          }
          return arr;
      }
       console.log('冒泡排序',bubbleSort(arr));

       //选择排序
       //每次从待排序的数据元素中选出最小（或最大）的一个元素，存放在序列的起始位置
      function selectionSort(arr){
          for(let i=0;i<arr.length;i++){
              for(let j=i+1;j<arr.length;j++){
                  if(arr[i]<arr[j]){
                      let temp = arr[i];
                      arr[i] = arr[j];
                      arr[j] = temp;
                  }
              }
          }
          return arr;
      }

      //插入排序，从头开始遍历，依次把元素插进去合适的位置
      function insertSort(arr){
          for(let i=1;i<arr.length;i++){
              let curIndex = i;
              while(curIndex>=0){
                  if(arr[curIndex-1]>arr[curIndex]){
                      let temp = arr[curIndex-1];
                      arr[curIndex-1] =  arr[curIndex];
                      arr[curIndex] = temp;
                      curIndex--;
                  }else{
                      break;
                  }
              }
          }
          return arr;
      }

      //归并排序 指的是将两个顺序序列合并成一个顺序序列的方法
      function mergeSort(arr){
          if(arr.length<2){ return arr };
          let mid = parseInt(arr.length/2);
          let left = arr.slice(0, mid);
          let right = arr.slice(mid);
          return merge(mergeSort(left), mergeSort(right));
      }   
      function merge(left, right){
          let catArr = [];
          while(left.length&&right.length){
              if(left[0]>right[0]){
                  catArr.push(left.shift());
              }else{
                  catArr.push(right.shift());
              }
          }
          return catArr.concat(left, right);
      }

      //快速排序,找中间值，把数据分成两部分，递归进行。
      function quickSort(arr){
          if(arr.length<2) return arr;
          let mid = parseInt(arr.length/2);
          let baseValue = arr.splice(mid,1);
          let left = [];
          let right = [];
          while(arr.length){
              let cur = arr.shift();
              if(cur>baseValue){
                  left.push(cur);
              }else{
                  right.push(cur);
              }
          }
          return quickSort(left).concat(baseValue, quickSort(right))
      }

  ```
