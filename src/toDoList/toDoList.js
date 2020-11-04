import React from 'react'
import ListItem from '../listItem/listItem'
import './toDoList.css'
import { v4 as uuidv4 } from 'uuid';

class List extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "What do I need to do?",
            list: [],
            newItem: {
                task: '',
                id: '',
                completed: false
            },
            flag: false,
            edited: [],
        }

        this.handleChange = this.handleChange.bind(this)
        this.addItemToTheList = this.addItemToTheList.bind(this)
        this.handleList = this.handleList.bind(this)
        this.handleFlagChange = this.handleFlagChange.bind(this)
        this.removeItem = this.removeItem.bind(this)
        this.completeTask = this.completeTask.bind(this)
        this.clearOnFocus = this.clearOnFocus.bind(this)
    }

    handleChange(e) {
        this.setState({
            newItem: {
                task: e.target.value,
                id: uuidv4(),
                completed: false
            }
        });
    }

    addItemToTheList(e) {
        e.preventDefault();
        if(this.state.newItem.task && this.state.newItem.task !== '' && this.state.newItem.task.length < 60) {
            let createdItem = this.state.newItem;
            let newItems = [...this.state.list, createdItem];
            this.setState({
                list: newItems,
                newItem: {
                    text: '',
                    id: '',
                    completed: false
                }
            });     
        };
    };

    removeItem(id) {
        const deletedItem = this.state.list.filter(item => item.id !== id);
        this.setState({
            list: deletedItem
        })
    }

    completeTask(id, done) {
        this.setState(() => ({
            list: this.state.list.map(item => (item.id === id) ? {...item, completed: done} : item)
        }))
    }

    handleList() {
        let showingList = this.state.list;
        let deleteItem = this.removeItem;
        let completeItem = this.completeTask;
        return (
        <ListItem
            items={showingList}
            removeItem={deleteItem}
            id={this.state.list}
            editItem={completeItem}  />
        )
    }

    handleFlagChange() {
        this.setState({flag: !this.state.flag})
    }

    clearOnFocus(e) {
            e.target.value = ''
    }

    render() {
        return(
            <div className='list-wrapper'>
                <div className='list-items-wrapper'>
                    <input className='list-input'
                    type="text"
                    onChange={this.handleChange}
                    placeholder={this.state.name}
                    value={this.state.newItem.task}
                    onFocus={this.clearOnFocus}
                    />
                    <button className='btn' onClick={this.addItemToTheList}>Add task</button>
                    {this.state.flag === false && (<button className='btn btn-show-hide' onClick={this.handleFlagChange}>Show List</button>)}
                    {this.state.flag && (<button className='btn btn-show-hide' onClick={this.handleFlagChange}>Hide List</button>)}
                </div>
                {this.state.flag && (
                    <div className='ul-wrapper'>
                        <h2>Todo List</h2>
                        <ul className='ul-item'> 
                        {this.handleList()}
                         </ul>                      
                    </div>)}
            </div>
        )
    }
}

export default List;