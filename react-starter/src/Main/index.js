import React, {Component} from 'react';
import ActivityList from './ActivityList';
import CreateActivity from './CreateActivity';
import EditActivity from './EditActivity';

// import FeatureList from './FeatureList';
// import FeatureCreate from './FeatureCreate';
// import FeatureEdit from './FeatureEdit';
// import Login from './Login';
// import Logout from './Logout';
// import Map from './Map';
// import Nav from './Nav';
// ---------------------------------------------------
class Main extends Component {
  constructor(props) {
    super()
    this.state = {
      activities: [],
      showEdit: false,
      editCatId: null,
      counter: 0,
      catToEdit: {
        'name': '',
      }
    }
  };
  // ---------------------------------------------------

  handleClick = (e) => {
    this.setState({
      counter: this.state.counter + 1
    })
  }
  // ---------------------------------------------------

  componentDidMount() {
    this.getActivities().then((activites) => {
      this.setState({
        activities: activities.data
      })
    }).catch((err) => {
      console.log(err);
    });
  }
  // ---------------------------------------------------

  getActivities = async () => {
    const activities = await fetch('http://localhost:8000/');
    const parsedActivities = activities.json();
    return parsedActivities
  }
  // ---------------------------------------------------

  addActivity = async (activity, e) => {
    e.preventDefault();

    try {
      const CreateActivity = await fetch('http://localhost:8000/', {
        method : 'POST',
        body : JSON.stringify(activity),
        headers : {
          'Content-Type': 'application/json'
        }
      });
    const parsedResponse = await CreateActivity.json();
    this.setState({
      activities: [...this.state.activities, parsedResponse.data]
    })
  } catch (err) {
    console.log(err);
  }
}
// ---------------------------------------------------

deleteActivity = async (id, e) => {
  e.preventDefault();
  console.log('deleteActivity function is being called, this is the id: ', id);

  try {
    const deleteActivity = await fetch('http://localhost:8000/' + id, {method: 'DELETE'});

    const parsedResponse = await deleteActivity.json();

    if (parsedResponse.status === 200) {
      this.setState({
        activities: this.state.activities.filter((activity, i) => activity.id !== id)
      });
    } else {
      console.log('there was an error in delete activity');
    }
  } catch (err) {
    console.log(err);
  }
}
// ---------------------------------------------------

showModal = (id) => {
  const activityToEdit = this.state.activities.find((activity) => activity._id === id);

  this.setState({
    showEdit: true,
    editActivityId: id,
    activityToEdit: activityToEdit
  });
}
// ---------------------------------------------------

closeAndEdit = async (e) => {
  e.preventDefault();

  try {
    const editActivity = await fetch('http://localhost:8000/' + this.state.editCatId, {
      'method': 'PUT',
      body: JSON.stringify(this.state.activityToEdit),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const parsedResponse = await editActivity.json();

    const editedActivityArray = this.state.activities.map((activity) => {

      if (activity._id === this.state.editActivityId) {
        activity.name = parsedResponse.data.name;
      }
      return activity
    });

    this.setState({
      activities: editedActivityArray,
      showEdit: false
    });
  } catch (err) {
    console.log(err)
  }
}

// ---------------------------------------------------

handleFormChange = (e) => {

  this.setState({
    activityToEdit: {
      ...this.state.activityToEdit,
      [e.target.name]: e.target.value
    }
  });
}
// ---------------------------------------------------

render() {
  return (<div>
    <h1>Welcome To Outdoor Austin!</h1>
    <h3>Create A List Of Your Favorite Outdoor Activities Or Add To Ours</h3>

    <ActivityList activities={this.state.activities} deleteActivity={this.deleteActivity} showModal={this.showModal}/>

    <CreateActivity addActivity={this.addActivity}/>

    {this.state.showEdit ? <EditActivity closeAndEdit={this.closeAndEdit} handleFormChange={this.handleFormChange} activityToEdit={this.state.activityToEdit}/>
        : null}

    <p>Count is {this.state.counter}</p>
    <button onClick={this.handleClick}>click if you love to be outside!</button>
  </div>);
}
}

export default Main;
