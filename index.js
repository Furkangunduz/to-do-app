const addItems = document.querySelector(".add-items");
const itemList = document.querySelector(".to-do");
const items = JSON.parse(localStorage.getItem("to-do")) || [];


function addItem(e){
    e.preventDefault();
    const text = this.querySelector("[name = item]").value;
    const item ={
        text : text,
        done : false
    };

    items.push(item);
    showItems(itemList,items);
    localStorage.setItem("to-do",JSON.stringify(items));
    this.reset();
}

function showItems(itemList =[],items){
    itemList.innerHTML = items.map((item,i) =>{
        return `
            <li>
                <div>
                    <input type = "checkbox" data-index = ${i} id = "item${i}" ${item.done ? 'checked': ''}/>
                    <label for = "item${i}">${item.text}</label> 
                </div>
                
                <img class = "remove-img" src="del.png" 
                data-index = ${i} id = "item${i}"
                style="height:15px;width:px;margin: auto 20px;">
                
            </li>
        `;
    }).join('');
}

function toggleDone(e){
    if (e.target.matches("input")){
        const el = e.target;
        const index = el.dataset.index;
        items[index].done = !items[index].done;
        localStorage.setItem("to-do",JSON.stringify(items)); 
        showItems(itemList,items);
        if(items[index].done) cornify_add();
            
    }
    if (e.target.matches("img")){
        const el = e.target;
        const index = el.dataset.index;
        
        if(items.length>0 && index>=0){
            items.splice(index,1);
            localStorage.setItem("to-do",JSON.stringify(items));
            showItems(itemList,items);
        }

    }
}



addItems.addEventListener("submit",addItem);
itemList.addEventListener("click",toggleDone);


showItems(itemList,items);