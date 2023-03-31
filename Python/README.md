# python基础语法入门
## 基础
### 基础类型
-   str int float bool list set map Dictionary
1. list列表 有序存储
    1. [] index insert append extend pop del remove clear count  
2. 元组 有序存储
    1.  (1,'hello', 'jingyuan')
    2. 一旦定义完成，元素不可以被修改 
    3. 方法： index  count len 
    4. 如果元素内的元素有list, 那么list是可以修改的。
3. 字符串
    1. 方法： index  replace(str1, str2)   split  strip('str')  count  

4. 序列：
    1. 内容连续，有序，支持下标索引的一类数据容器，比如 列表，元祖, 字符串
    2. 对序列的切片操作
        - 可以对list, tuple, string等进行切片
        - [1,2,4][1:2:2]  [开始:结束：步长]
    3. 序列[起始：结束：步长]
        - 起始可以省略，省略从头开始。
        - 结束可以省略，省略到尾结束。
        - 步长可以省略，省略步长为1（可以是负数，表示倒叙执行）
5. set(集合)：无序切元素不能重复
    1. set() 空集合只能是set();
    2. 方法：add   remove  pop随机取出   clear difference差集      difference_update     union   
    ```python
        set1 = {1, 3, 5, 7, 9}
        set2 = {2, 4, 6, 8, 10, 1}
        # 取差集，生成新的set, set1裡面有的元素，set2裡面沒有的元素。
        diffSet = set1.difference(set2)
        print(f"set1和set2的差集：{diffSet}")
        # 刪除差集，在set1中消除set2中相同的元素, set1会改变，set2不会变
        set1.difference_update(set2)
        print(f"set1消去差集：{set1}")
        # 合并成新的集合，set1和set2 不会改变
        unionSet = set1.union(set2)
        print(f"set1和set2合并的新集合：{unionSet}")
    ```
    3. 集合的遍历：
        1. for in
6. 字典dictionary key-value键值对的集合。
    1. 定义： {}空字典
    2. 操作： `dict.pop(key)`  `dict.clear()`  `dict.keys()`   `len(dict)`;    

7. 通用操作
    1. `len` `max`  `min`
    2. str() list() set() tuple()
    3. sorted() 对内容排序返回个列表   sorted(序列，[reverse=true])反排

8. 字符串大小比较
    1. 
 
