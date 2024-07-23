const database = []; 

function validate() {
  //
  var fullname_input = document.getElementById('fullname');
  var email_input = document.getElementById('email');
  var phone_input = document.getElementById('phone');
  var password_input = document.getElementById('password');

  // get the error message placeholders
  var invalid_feedbacks = document.getElementsByClassName('invalid-feedback')

  var success_message = document.getElementById('alert-success');
  // console.log(invalid_feedbacks);

  var fullname = fullname_input.value;
  var email = email_input.value;
  var phone = phone_input.value;
  var password = password_input.value;

  //validation;
  var is_validated = true;

  // Validate Name
  var fullname_pattern = /^[a-zA-Z ]+$/;
  console.log(fullname_pattern.test(fullname));
  if ( ! fullname_pattern.test(fullname)) {
    invalid_feedbacks[0].innerHtml = 'Invalid fullname format';  
    fullname_input.classList.add('is-invalid'); 
    var is_validated = false;
  }
  else {
    fullname_input.classList.add('is-valid'); 
  }

  // Validate email
  var email_pattern = /^[a-z]+\.{1}[a-z]+\@xool\.com$/;
  if ( ! email_pattern.test(email)) {
    invalid_feedbacks[1].innerHtml = 'Invalid email format'; 
    email_input.classList.add('is-invalid');
    var is_validated = false;
  }
  else {
    email_input.classList.add('is-valid'); 
  }

  // validate phone
  var phone_pattern = /^0[0-9]{10}$/;
  if ( ! phone_pattern.test(phone)) {
    invalid_feedbacks[2].innerHtml = 'Invalid phone format'; 
    phone_input.classList.add('is-invalid');
    var is_validated = false;
  }
  else {
    phone_input.classList.add('is-valid'); 
  }

   // validate password
   var password_pattern = /^.{8,}$/;
  if ( ! password_pattern.test(password)) {
    invalid_feedbacks[3].innerHtml = 'Invalid password format'; 
    password_input.classList.add('is-invalid');
    var is_validated = false;
  }
  else {
    password_input.classList.add('is-valid'); 
  }
  
  // save record to the database
  // if valdation passes

  if (is_validated) {
    var validatedData = {
      'fullname' : fullname,
      'email' : email,
      'phone' : phone,
      'password' : password,
    }
  
    database.push(validatedData);

    fullname_input.value = '';
    email_input.value = '';
    phone_input.value = '';
    password_input.value = '';

    
    success_message
    .classList
    .remove('d-none');

    //Display the content of the datebase
    print_databese();
  }
  else {
    success_message
    .classList
    .add('d-none');
  }
  


}


function print_databese() {
  var table_body = document.getElementById('table-body');
  var rows = '';
  var sn = 0;
  
  database.forEach(record => {
    index = sn;
    rows = rows +
    '<tr>' +
    '<td>' + ++sn + '</td>' +
      '<td>' + record.fullname + '</td>' +
      '<td>' + record.email + '</td>' +
      '<td>' + record.phone + '</td>' +
      '<td>' + record.password + '</td>' +
      `<td>
         <button class="btn btn-danger" onclick="remove_rows(`+ index +`)">
              <i class="bi bi-person-x"></i>
         </button>
      </td>` +
    '</tr>';
  });

  table_body.innerHTML = rows;
}

function remove_rows(index) {
  database.splice(index, 1);
  print_databese();
}

document.getElementById('submit-btn')
.addEventListener('click', function (e) {
  e.preventDefault();
  validate();
})