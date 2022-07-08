import React from 'react'
import Firebase from '../../../Firebase/firebaseConfig'

function DeleteModal({order , shop}) {
    async function handleDelete(){
        await Firebase.database().ref(`${shop}/${order.code}`).once('value', snapshot=>{
            if(snapshot.val()){
                Firebase.database().ref(`${shop}/${order.code}`).remove();
            }
        })
    }
    return (
        <button className="btn-sm btn-danger" style={{width:'80px'}}
            onClick={handleDelete}
        >Delete</button>
    )
}

export default DeleteModal