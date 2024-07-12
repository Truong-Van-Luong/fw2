import 'bootstrap/dist/css/bootstrap.min.css';
import './register.scss';


function Register() {
    return ( 
  <section className="h-100 gradient-form" style={{ backgroundColor: '#eee' }}>
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-xl-10">
            <div className="card rounded-3 text-black">
              <div className="row g-0">
                <div className="col-lg-6">
                  <div className="card-body p-md-5 mx-md-4">
    
                  
                    <form >
                      <div className="text-center">
                        <h1 className="mt-1 mb-5 pb-1">REGISTER</h1>
                      </div>

                      <p>Please register account</p>

                      <div data-mdb-input-init className="form-outline mb-4">
                        <input type="text" id="username" className="form-control" placeholder="Username" name="username"  />
                      </div>

                      <div data-mdb-input-init className="form-outline mb-4">
                        <input type="email" id="email" className="form-control" placeholder="Email" name="email" />
                      </div>

                      <div data-mdb-input-init className="form-outline mb-4">
                        <input type="password" id="password" className="form-control" placeholder="Password" name="password"  />  
                      </div>

                      
                      <div className="form-check d-flex justify-content-center mb-4">
                        <input className="form-check-input me-2" type="checkbox" value="" id="registerCheck" checked aria-describedby="registerCheckHelpText" />
                        <label className="form-check-label" >
                          I have read and agree to the terms
                        </label>
                      </div>

                      <div className="text-center pt-1 mb-5 pb-1">
                        <button type="submit" className="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3 btn-login">SIGN UP</button>
                      </div>
                    </form>

    
                  </div>
                </div>
                <div className="col-lg-6 d-flex align-items-center gradient-custom-2">
                  <div className="text-white px-3 py-4 p-md-5 mx-md-4 text-center">
                    <h2 className="mb-4">Welcome Back!</h2>
                    <p className="small mb-0">Register with your personal details to use all of site features</p>
                    <button  type="button" data-mdb-button-init data-mdb-ripple-init className="btn btn-outline-info mt-4">SIGN IN</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

     );
}

export default Register;




  