import React from 'react';
import './listItem.css'
import classNames from 'classnames'


function ListItem(props) {
    const listItems = props.items.map(item => {

    let btnCompleted = classNames({
        'list-item-completed': item.completed,
        'li-list-item': true
        
    })

    return(
            <li key={item.id} id={item.id} className={btnCompleted}>{item.task}
                <div>
                    {!item.completed &&(<button onClick={() => props.editItem(item.id, !item.completed)} className='list-btn btn-completed'>
                        <i className="fas fa-check"></i>
                    </button>)}
                    {item.completed &&(<button onClick={() => props.editItem(item.id, !item.completed)} className='list-btn btn-uncompleted'>
                        <i className="fas fa-undo"></i>
                    </button>)}
                    <button onClick={() => props.removeItem(item.id)} className='list-btn btn-delete-item'>
                        <i className="fas fa-trash"/>
                    </button>
                </div>
            </li>
        )
    })
    
    return(
        listItems
    )
   
}

export default ListItem;
