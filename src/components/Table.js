import React, { Component } from "react";
import contacts from "../contacts.json";

const showingContacts = contacts.slice(0, 5);
const backUpContacts = [...contacts];
backUpContacts.splice(0, 5);

class List extends Component {
  state = {
    list: showingContacts,
    fullList: backUpContacts,
  };

  addRandom = () => {
    const randomNum = Math.floor(Math.random() * this.state.fullList.length);

    const newList = [...this.state.list];
    const newFullList = [...this.state.fullList];

    newList.push(newFullList[randomNum]);
    newFullList.splice(randomNum, 1);

    this.setState({ list: newList, fullList: newFullList });
  };

  sortName = () => {
    const newList = [...this.state.list];
    console.log(newList);

    newList.sort((a, b) => {
      if (a.name > b.name) {
        return 1;
      } else if (a.name < b.name) {
        return -1;
      } else {
        return 0;
      }
    });

    console.log(newList);

    this.setState({ list: newList });
  };

  sortPopularity = () => {
    const newList = [...this.state.list];

    newList.sort((a, b) => {
      return b.popularity - a.popularity;
    });

    this.setState({ list: newList });
  };

  handleDelete = (contactId) => {
    console.log(this.state.list);
    const newList = this.state.list.filter(
      (contact) => contactId !== contact.id
    );
    console.log(newList);
    this.setState({ list: newList });
  };

  render() {
    return (
      <div>
        <h1>IronContacts</h1>
        <button onClick={this.addRandom}>Add Random Contact</button>
        <button onClick={this.sortName}>Sort by Name</button>
        <button onClick={this.sortPopularity}>Sort by Popularity</button>
        <table>
          <thead>
            <tr>
              <th>
                <h4>Picture</h4>
              </th>
              <th>
                <h4>Name</h4>
              </th>
              <th>
                <h4>Popularity</h4>
              </th>
              <th>
                <h4>Action</h4>
              </th>
            </tr>
          </thead>
          <tbody>
            {this.state.list.map((contact) => {
              return (
                <tr key={contact.id}>
                  <td>
                    <img src={contact.pictureUrl} alt="" />
                  </td>
                  <td>{contact.name}</td>
                  <td>{contact.popularity}</td>
                  <td>
                    <button
                      onClick={() => {
                        this.handleDelete(contact.id);
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default List;
