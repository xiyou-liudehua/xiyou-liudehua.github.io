var num = 0;

function saveData(date) {
    localStorage.setItem('todo', JSON.stringify(date));
}

function addToDoList() {
    var toDoList = {
        todo: "", //用于存储用户输入的数据
        done: false //初始化用户输入的数据属性，以便对用户待办事项进行分类
    };
    var inputValue = document.querySelector(".navcrn-ipt");
    if (inputValue.value.trim() === "") {
        alert("请输入有效内容");
        return;
    }
    toDoList.todo = inputValue.value;
    var todolist;
    if (!(localStorage.getItem('todo'))) {
        todolist = [];
    } else {
        todolist = JSON.parse(localStorage.getItem('todo'));
    }
    todolist.push(toDoList);
    saveData(todolist);
    if (num == 0) {
        num = JSON.parse(localStorage.getItem("todo")).length - 1;
    }
    var ol = document.querySelector('.mid-ol');
    var spanO = document.querySelector('.mid-spanO'); //找到正在进行的数量盒子
    var inputText = document.createElement("input"); //添加表单元素
    inputText.setAttribute('type', 'checkbox'); //设置文本类型
    inputText.classList.add('checkdom'); //添加类名
    inputText.setAttribute('indexCheck', num);
    inputText.setAttribute('done', false);
    var spanText = document.createElement('span'); //添加文本盒子
    spanText.type = 'text'; //设置文本类型
    spanText.className = 'textcon'; //添加类名
    spanText.setAttribute('indexText', num);
    var btn = document.createElement("button"); //添加删除按钮
    btn.innerHTML = 'DEL'; //给删除按钮命名DEL
    btn.classList.add("delbtn"); //添加类名
    btn.setAttribute('indexBtn', num);
    var node = document.createElement("li"); //添加li元素
    var value = inputValue.value;
    node.appendChild(inputText) //li元素中添加checkbox勾选元素
    node.appendChild(spanText); //li元素中添加输入的value值
    spanText.innerHTML = value;
    node.appendChild(btn); //li元素中添加删除按钮
    inputValue.value = "";
    ol.insertBefore(node, ol.children[0]); //在前面添加子节点li元素
    spanO.innerHTML = ol.children.length;
    num++;
}
var addBtn = document.getElementById('addbtn'); //添加按钮
var inputValue = document.querySelector(".navcrn-ipt");
var delAllBtn = document.querySelector('#delallbtn'); //获取全部清除按钮
var clear = document.querySelector('a'); //clear全部清除链接
var midCtn = document.querySelector('.ctn-middle'); //找到中间部分的容器

addBtn.addEventListener('click', function() {
    addToDoList();
});
inputValue.onkeyup = function(e) {
    if (e.keyCode === 13) {
        addBtn.click(); //调用点击事件
    }
}
delAllBtn.addEventListener('click', function() {
    num = 0;
    localStorage.clear();
    load();
})
clear.onclick = function() {
    delAllBtn.click();
}

function load() {
    var ol = document.querySelector('.mid-ol');
    var ul = document.querySelector('.mid-ul');
    var content = localStorage.getItem('todo');
    var spanO = document.querySelector('.mid-spanO'); //找到正在进行的数量盒子
    var spanU = document.querySelector('.mid-spanU'); //找到已经完成的数量盒子
    if (content != null) {
        var date = JSON.parse(content);
        for (var i = 0; i < date.length; i++) {
            if (!date[i].done) {
                var inputText = document.createElement("input"); //添加表单元素
                inputText.setAttribute('type', 'checkbox'); //设置文本类型
                inputText.classList.add('checkdom'); //添加类名
                inputText.setAttribute('indexCheck', i);
                inputText.checked = false;
                var spanText = document.createElement('span'); //添加文本盒子
                spanText.type = 'text'; //设置文本类型
                spanText.className = 'textcon'; //添加类名
                spanText.setAttribute('indexText', i);
                var btn = document.createElement("button"); //添加删除按钮
                btn.innerHTML = 'DEL'; //给删除按钮命名DEL
                btn.classList.add("delbtn"); //添加类名
                btn.setAttribute('indexBtn', i);
                var node = document.createElement("li"); //添加li元素
                var value = date[i].todo;
                node.appendChild(inputText) //li元素中添加checkbox勾选元素
                node.appendChild(spanText); //li元素中添加输入的value值
                spanText.innerHTML = value;
                node.appendChild(btn); //li元素中添加删除按钮
                // ol.insertBefore(node, ol.children[0]); //在前面添加子节点li元素
                ol.appendChild(node);
            } else {
                var inputText = document.createElement("input"); //添加表单元素
                inputText.setAttribute('type', 'checkbox'); //设置文本类型
                inputText.classList.add('checkdom'); //添加类名
                inputText.setAttribute('indexCheck', i);
                inputText.checked = true;
                var spanText = document.createElement('span'); //添加文本盒子
                spanText.type = 'text'; //设置文本类型
                spanText.className = 'textcon'; //添加类名
                spanText.setAttribute('indexText', i);
                var btn = document.createElement("button"); //添加删除按钮
                btn.innerHTML = 'DEL'; //给删除按钮命名DEL
                btn.classList.add("delbtn"); //添加类名
                btn.setAttribute('indexBtn', i);
                var node = document.createElement("li"); //添加li元素
                var value = date[i].todo;
                node.appendChild(inputText) //li元素中添加checkbox勾选元素
                node.appendChild(spanText); //li元素中添加输入的value值
                spanText.innerHTML = value;
                node.appendChild(btn); //li元素中添加删除按钮
                // ul.insertBefore(node, ul.children[0]); //在前面添加子节点li元素
                ul.appendChild(node);
            }
            spanU.innerHTML = ul.children.length;
            spanO.innerHTML = ol.children.length;
        }
    } else {
        ol.innerHTML = '';
        ul.innerHTML = '';
        spanO.innerHTML = 0;
        spanU.innerHTML = 0;
    }
}
/*
设置事件委托---委托对象为中间的容器 
*/
midCtn.addEventListener('click', function(e) {
    var ol = document.querySelector('.mid-ol');
    var ul = document.querySelector('.mid-ul');
    var content = localStorage.getItem('todo');
    var spanO = document.querySelector('.mid-spanO'); //找到正在进行的数量盒子
    var spanU = document.querySelector('.mid-spanU'); //找到已经完成的数量盒子
    if (e.target.className.toLowerCase() === 'checkdom') { //e.target.nodeName判断当前元素是否是"input"
        var li = e.target.parentNode; //找到li的位置为当前元素的父元素
        var cnode = li.cloneNode(true); //克隆整个li元素
        if (li.parentNode.className === 'mid-ol' && e.target.checked) { //判断li的父元素的类名是否为"mid-ol"并且判断checkbox是否被勾选了
            var todolist = JSON.parse(localStorage.getItem('todo'));
            todolist[e.target.getAttribute('indexcheck')].done = true;
            saveData(todolist);
            ul.insertBefore(cnode, ul.children[0]);
            li.remove();
            spanU.innerHTML = ul.children.length;
            spanO.innerHTML = ol.children.length;
        } else {
            var todolist = JSON.parse(localStorage.getItem('todo'));
            todolist[e.target.getAttribute('indexcheck')].done = false;
            saveData(todolist);
            ol.appendChild(cnode);
            li.remove();
            spanU.innerHTML = ul.children.length;
            spanO.innerHTML = ol.children.length;
        }
    } else if (e.target.nodeName.toLowerCase() === 'button') { //e.target.nodeName判断当前元素是否是"button"
        var todolist = JSON.parse(localStorage.getItem('todo'));
        todolist.splice(e.target.getAttribute('indexbtn'), 1);
        saveData(todolist);
        var currLi = e.target.parentNode;
        currLi.remove();
        spanU.innerHTML = ul.children.length;
        spanO.innerHTML = ol.children.length;
    } else if (e.target.className.toLowerCase() === 'textcon' && e.target.children.length === 0) { //e.target.className判断当前元素是否是文本内容盒子
        var con = e.target.innerHTML;
        e.target.innerHTML = '<input type="text" class="put"></input>';
        var input = e.target.children[0];
        input.value = con;
        input.select(); //文本框里的文字处于选定状态
        input.onblur = function() {
            this.parentNode.innerHTML = this.value;
            var todolist = JSON.parse(localStorage.getItem('todo'));
            todolist[e.target.getAttribute('indextext')].todo = this.value;
            saveData(todolist);
        };
        input.onkeyup = function(e) {
            if (e.keyCode === 13) {
                //手动调用
                this.blur();
            }
        };
    }
});
window.onload = load;

window.addEventListener("storage", load, false);