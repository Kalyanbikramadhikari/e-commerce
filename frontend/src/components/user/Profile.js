import React from 'react'
import { useSelector } from 'react-redux'

const Profile = () => {
    const {user}= useSelector(state=>state.auth)
  return (
      
  <div class ="row">
    <div  class="col-lg-4">
      <div class="text-center">
        <div class="box-element">
          <img src="/images/default_avatar.jpg" alt="Admin" class="rounded-circle" width="150"/>
  
          <p class="text-secondary mb-1">{user.name}</p>
          <form action="editprofile">
            <button class="btn btn-but"><i class="fas fa-user-edit"></i> Edit info</button>
            </form>
                
         </div>

      </div>


    </div>

    <div  class="col-lg-8">
      <div class="text-left">
        <div class="box-element">
          <br/>

          <h4>{user.name}</h4>
          <i class="fas fa-map-marker-alt"></i> l;ksdf
          <br/>
          <i class="fas fa-envelope"></i> {user.email}
          <br/>
          <i class="fas fa-mobile-alt" ></i> 98776543221<br/>
        
          <br/>
          <span>Created At:{user.createdAt}</span>
          {/* You have uploaded <strong> {{len}} </strong> products currently active in the store. */}
          <form action="upload">
            <button  class="btn btn-bu"> <i class="fas fa-plus-circle"></i> Add Products</button>
            </form>
       
            <button type="button" class="btn btn-danger" data-toggle="modal" data-target="#exampleModalCenter">
              Delete Account
            </button>
        </div>
      </div>
        
        {/* <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLongTitle">Delete Account?</h5>
                
            </div>
            <div class="modal-body">
                Are you sure you would like to delete your account? This action is irreversable and all your info will be deleted.
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                <form action="{% url 'deleteacc' %}" method="post">
                {% csrf_token %}
                <button type="submit" class="btn btn-danger" >Confirm Deletion</button>
                </form>
            </div>
            </div>
        </div>
        </div> */}
          
      
    </div>
  </div>


    
 
  )
}

export default Profile