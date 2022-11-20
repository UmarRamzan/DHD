

import React, {Component} from "react";
import {Link} from 'react-scroll'
class Home extends Component{
    render()
    {
        return(<div>
           





           <br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<style></style>
<div id="sign_in">
Sign In
<br/>
<br/>
<br/>


<form action="API/API.js"/>

	<select name="account_type" id="account_type">
	  <option value="doctor">Doctor</option>
	  <option value="patient">Patient</option>
	  <option value="hospital">Hospital</option>
	  
	</select>


<div class="wrap-input100 validate-input m-b-20" data-validate="Enter email">
<input class="input100" type="email" name="email" placeholder="email"/>
<span class="focus-input100"></span>
</div>

<div class="wrap-input100 validate-input m-b-20" data-validate="Enter password">
	<input class="input100" type="password" name="password" placeholder="password"/>
	<span class="focus-input100"></span>
	</div>

<div class="container-login100-form-btn">
	<br/>

<button class="login100-form-btn" type = "submit">
Sign In
</button>
<br/>
<br/>
<br/>
</div>

	<br/>
	<br/>

<br/>
<br/>

<div class="text-center">
<u>
<Link  to="sign_up" spy={true} smooth={true}>
Sign Up
    </Link>

</u>
</div>

<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>

<br/>
<br/>
<br/>
<br/>
<br/>
<br/>

<br/>
<br/>
<br/>
<br/>




<br/>
<br/>
<br/>
<br/>
<br/>



<div id="sign_up">
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
<form action="API/API.js"/>
What do you want to sign up as?  
<button class="login100-form-btn" >
<Link  to="patient_sign_up" spy={true} smooth={true}>
    Patient
    </Link>

</button>
<button class="login100-form-btn" >
<Link  to="doctor_sign_up" spy={true} smooth={true}>
    Doctor
    </Link>
</button>
<button class="login100-form-btn">
<Link  to="hospital_sign_up" spy={true} smooth={true}>
    Hospital
    </Link>
</button>
</div>
<form/>

<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<style></style>
<div id="doctor_sign_up">
Sign Up as Doctor
<br/>
<br/>
<br/>


<div class="wrap-input100 validate-input m-b-20" data-validate="Enter first name">
<input class="input100" type="text" name="first_name" placeholder="first name"/>
<span class="focus-input100"></span>
</div>

<div class="wrap-input100 validate-input m-b-20" data-validate="Enter last name">
  <input class="input100" type="text" name="last_name" placeholder="last name"/>
  <span class="focus-input100"></span>
  </div>

  <div class="wrap-input100 validate-input m-b-20" data-validate="Enter email">
    <input class="input100" type="email" name="email" placeholder="email"/>
    <span class="focus-input100"></span>
    </div>


    <div class="wrap-input100 validate-input m-b-20" data-validate="Enter password">
      <input class="input100" type="password" name="password" placeholder="password"/>
      <span class="focus-input100"></span>
      </div>


<div class="wrap-input100 validate-input m-b-25" data-validate="Enter specialization">
<input class="input100" type="text" name="specialization" placeholder="specialization"/>
<span class="focus-input100"></span>
</div>
<div class="wrap-input100 validate-input m-b-25" data-validate="Enter city">
  <input class="input100" type="text" name="city" placeholder="city"/>
  <span class="focus-input100"></span>
  </div>
  <div class="wrap-input100 validate-input m-b-25" data-validate="Enter address">
    <input class="input100" type="text" name="address" placeholder="address"/>
    <span class="focus-input100"></span>
    </div>
    <div class="wrap-input100 validate-input m-b-25" data-validate="Enter timings">
      <input class="input100" type="text" name="timings" placeholder="timings"/>
      <span class="focus-input100"></span>
      </div>


 <br/>
<div>
 Bio :<textarea name="bio" cols="30" rows="10"> </textarea>
</div>
<br/>

<div class="wrap-input100 validate-input m-b-25" data-validate="Online availability">
  Online availability: 
  <input class="input100" type="checkbox" name="online_availability" placeholder="online availability"/>
  <span class="focus-input100"></span>
  </div>
      
        
        <div class="wrap-input100 validate-input m-b-25" data-validate="Enter charges">
          <input class="input100" type="number" name="charges" placeholder="charges"/>
          <span class="focus-input100"></span>
          </div>



<div class="container-login100-form-btn"/>
	<br/>

<button class="login100-form-btn">
Sign Up
</button>

<form/>
<br/>
<br/>
<br/>
</div>

	<br/>
	<br/>

<br/>
<br/>

<div class="text-center">
  <u>
<Link  to="sign_in" spy={true} smooth={true}>
Back to sign in
    </Link>
 </u>       

</div>
<form/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>

<br/>
<br/>
<br/>
<br/>
<br/>
<br/>

<br/>
<br/>
<br/>
<br/>


<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<style></style>
<div id = "patient_sign_up">
Sign Up as Patient
<br/>
<br/>
<br/>

<div class="wrap-input100 validate-input m-b-20" data-validate="Enter first name">
<input class="input100" type="text" name="first_name" placeholder="first name"/>
<span class="focus-input100"></span>
</div>

<div class="wrap-input100 validate-input m-b-20" data-validate="Enter last name">
  <input class="input100" type="text" name="last_name" placeholder="last name"/>
  <span class="focus-input100"></span>
  </div>

  


<div class="container-login100-form-btn">
	<br/>

<button class="login100-form-btn">
Sign Up
</button>
<form/>
<br/>
<br/>
<br/>
</div>

	<br/>
	<br/>

<br/>
<br/>

<div class="text-center">
  <u>
<Link  to="sign_in" spy={true} smooth={true}>
  
Back to sign in
    </Link>
    </u>
</div>
<form/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>

<br/>
<br/>
<br/>
<br/>
<br/>
<br/>

<br/>
<br/>
<br/>
<br/>


<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<style></style>
<div id = "hospital_sign_up">
Sign Up as Hospital
<br/>
<br/>
<br/>


<div class="wrap-input100 validate-input m-b-20" data-validate="Enter name">
<input class="input100" type="text" name="name" placeholder=" name"/>
<span class="focus-input100"></span>
</div>

<div class="wrap-input100 validate-input m-b-20" data-validate="Enter city">
  <input class="input100" type="text" name="city" placeholder="city"/>
  <span class="focus-input100"></span>
  </div>

<div class="wrap-input100 validate-input m-b-20" data-validate="Enter address">
    <input class="input100" type="text" name="address" placeholder="address"/>
    <span class="focus-input100"></span>
    </div>

  


<div class="container-login100-form-btn">
	<br/>

<button class="login100-form-btn">
Sign Up
</button>
<form/>
<br/>
<br/>
<br/>
</div>

	<br/>
	<br/>

<br/>
<br/>

<div class="text-center"/>
  <u>
<Link  to="sign_in" spy={true} smooth={true}>
Back to sign in
    </Link>
    </u>
<div/>
<form/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>

<br/>
<br/>
<br/>
<br/>
<br/>
<br/>

<br/>
<br/>
<br/>
<br/>




































</div>
</div>
</div>
</div>
);









}}

export default Home;