import React from 'react';

const ActivityList = (props) => {

    const ActivityList = props.activities.map((activity, i) => {
        return (
            <li key={activity.id}>

                <h3>{activity.name}</h3>

                <button onClick={props.deleteActivity.bind(null, activity._id)}>Delete</button>
                <button onClick={props.showModal.bind(null, activity._id)}>Edit</button>

            </li>
        )
    });

    return (
        <ul>
            {ActivityList}
        </ul>
    )
}

export default ActivityList;
