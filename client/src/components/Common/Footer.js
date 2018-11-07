import React from 'react';

const Footer = () => {
  return (
              
    <footer class="page-footer font-small mdb-color pt-4  custom-footer bg-dark">
      <div class="row d-flex align-items-center">

   
        <div class="col-md-7 col-lg-8">

      
          <p class="text-center text-md-left">© 2018 Copyright:
            <a href="https://mdbootstrap.com/education/bootstrap/">
              <strong> WeedohEvents </strong>
            </a>
          </p>

        </div>
    
        <div class="col-md-5 col-lg-4 ml-lg-0">
      
          <div class="text-center text-md-right">
            
            <ul class="list-unstyled list-inline">
              <li class="list-inline-item">
                Sign Up with...
              </li>
              <li class="list-inline-item">
                <a class="btn-floating btn-sm rgba-white-slight mx-1">
                  <i class="fa fa-facebook"></i>
                </a>
              </li>
              <li class="list-inline-item">
                <a class="btn-floating btn-sm rgba-white-slight mx-1">
                  <i class="fa fa-twitter"></i>
                </a>
              </li>
              <li class="list-inline-item">
                <a class="btn-floating btn-sm rgba-white-slight mx-1">
                  <i class="fa fa-google-plus"></i>
                </a>
              </li>
              <li class="list-inline-item">
                <a class="btn-floating btn-sm rgba-white-slight mx-1">
                  <i class="fa fa-linkedin"></i>
                </a>
              </li>
            </ul>
          </div>

        </div>
   
      </div>
    </footer>
  );
};

export default Footer;