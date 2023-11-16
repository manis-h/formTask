import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import axios from "axios";
function App() {
  const [mode, setMode] = useState(false);
  const [form, setForm] = useState({});
  useEffect(() => {
    console.log({ form });
  }, [form]);
  useEffect(() => {
    if (form?.dob) {
      var today = new Date();
      var birthDate = new Date(form?.dob);
      var age = today.getFullYear() - birthDate.getFullYear();
      var m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      setForm({
        ...form,
        age: age,
      });
    }
  }, [form?.dob]);
  const [state, setstate] = useState();

  const [cities, setcities] = useState();

  const [formlist, setformlist] = useState();
  const fetchState = async () => {
    const states = await axios.get("http://localhost:4000/states");
    setstate(states?.data?.state);
  };
  const getforms = () => {
    axios
      .get(`http://localhost:4000/form`)
      .then(function (response) {
        // handle success
        // console.log(response);
        setformlist(response?.data?.data);
      })
      .catch(function (error) {
        // handle error
      });
  };
  useEffect(() => {
    getforms();
  }, [mode]);
  useEffect(() => {
    form?.state &&
      axios
        .get(`http://localhost:4000/cities?state=${form?.state}`)
        .then(function (response) {
          // handle success
          // console.log(response);
          setcities(response?.data?.city);
        })
        .catch(function (error) {
          // handle error
        });
  }, [form?.state]);
  useEffect(() => {
    fetchState();
  }, []);
  useEffect(() => {
    console.log({ state });
  }, [state]);
  function handleGender(event) {
    setForm({ ...form, gender: event.target.value });
    console.log(event.target.value);
  }

  //Submission
  const HandleSubmit = async (e) => {
    e.preventDefault();
    if (form?.age < 14) return alert("Age should be more than 14");
    await axios
      .post("http://localhost:4000/form", {
        form,
      })
      .then(function (response) {
        alert("Successfully Submitted");
        setForm({});
        setMode(true);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <>
      <div className="row">
        <button
          onClick={() => setMode(true)}
          className="btn btn-primary m-3 col"
        >
          FormLists
        </button>

        <button
          onClick={() => setMode(false)}
          className="btn btn-primary m-3 col"
        >
          FormFill
        </button>
      </div>

      {mode ? (
        <div>
          <table class="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">firstName</th>
                <th scope="col">LastName</th>
                <th scope="col">Age</th>
                <th scope="col">Gender</th>

                <th scope="col">Country</th>

                <th scope="col">State</th>

                <th scope="col">City</th>
              </tr>
            </thead>
            <tbody>
              {formlist?.map((i, index) => (
                <tr>
                  <td>{index + 1}</td>

                  <td>{i?.firstName}</td>

                  <td>{i?.lastName}</td>

                  <td>{i?.age}</td>

                  <td>{i?.gender}</td>

                  <td>{i?.country}</td>

                  <td>{i?.state}</td>

                  <td>{i?.city}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div>
          <div className="container">
            <form onSubmit={HandleSubmit}>
              <div className="row">
                <div className="col">
                  <div class="form-floating mb-3">
                    <input
                      value={form?.firstName || ""}
                      onChange={(e) => {
                        setForm({
                          ...form,
                          firstName: e.target.value,
                        });
                      }}
                      type="text"
                      class="form-control"
                      id="floatingfName"
                      placeholder="First Name"
                    />
                    <label for="floatingfName">First name</label>
                  </div>
                </div>
                <div className="col">
                  <div class="form-floating mb-3">
                    <input
                      value={form?.lastName || ""}
                      onChange={(e) => {
                        setForm({
                          ...form,
                          lastName: e.target.value,
                        });
                      }}
                      type="text"
                      class="form-control"
                      id="floatinglName"
                      placeholder="Last Name"
                    />
                    <label for="floatinglName">last name</label>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col">
                  <div class="form-floating mb-3">
                    <input
                      disabled
                      value={form?.age || ""}
                      onChange={(e) => {
                        setForm({
                          ...form,
                          age: e.target.value,
                        });
                      }}
                      type="number"
                      class="form-control"
                      id="floatingage"
                      placeholder="Age"
                    />
                    <label for="floatingage">Age</label>
                  </div>
                </div>
                <div className="col">
                  <div class="form-floating mb-3">
                    <input
                      value={form?.email || ""}
                      onChange={(e) => {
                        setForm({
                          ...form,
                          email: e.target.value,
                        });
                      }}
                      type="email"
                      class="form-control"
                      id="floatingInput"
                      placeholder="name@example.com"
                    />
                    <label for="floatingInput">Email address</label>
                  </div>
                </div>
              </div>

              <div class="form-floating mb-3">
                <input
                  value={form?.dob || ""}
                  onChange={(e) => {
                    setForm({
                      ...form,
                      dob: e.target.value,
                    });
                  }}
                  type="date"
                  class="form-control"
                  id="floatingdob"
                  placeholder="DATE OF BIRTH"
                />
                <label for="floatingdob">DATE OF BIRTH</label>
              </div>
              <h3>Gender</h3>
              <div onChange={handleGender}>
                <div class="form-check">
                  <input
                    class="form-check-input"
                    p
                    type="radio"
                    name="flexRadioDefault"
                    id="flexRadioDefault1"
                    value="Male"
                  />
                  <label class="form-check-label" for="flexRadioDefault1">
                    Male
                  </label>
                </div>
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="radio"
                    value="Female"
                    name="flexRadioDefault"
                    id="flexRadioDefault2"
                  />
                  <label class="form-check-label" for="flexRadioDefault2">
                    Female
                  </label>
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <div class="form-floating">
                    <select
                      class="form-select"
                      id="floatingSelect"
                      aria-label="Floating label select example"
                      value={form?.country || ""}
                      onChange={(e) => {
                        setForm({
                          ...form,
                          country: e.target.value,
                        });
                      }}
                    >
                      <option selected>Country</option>
                      <option value="India">India</option>
                    </select>
                    <label for="floatingSelect">Select State</label>
                  </div>
                </div>
                <div className="col">
                  <div class="form-floating">
                    <select
                      class="form-select"
                      value={form?.state || ""}
                      onChange={(e) => {
                        setForm({
                          ...form,
                          state: e.target.value,
                        });
                      }}
                      id="floatingSelect"
                      aria-label="Floating label select example"
                    >
                      <option selected>Select State</option>
                      {state?.map((i) => (
                        <option value={i}>{i}</option>
                      ))}
                    </select>
                    <label for="floatingSelect">Select State</label>
                  </div>
                </div>
                <div className="col">
                  <div class="form-floating">
                    <select
                      value={form?.city || ""}
                      onChange={(e) => {
                        setForm({
                          ...form,
                          city: e.target.value,
                        });
                      }}
                      class="form-select"
                      id="floatingSelect"
                      aria-label="Floating label select example"
                    >
                      <option selected>Select City</option>
                      {cities?.map((i) => (
                        <option value={i}>{i}</option>
                      ))}
                    </select>
                    <label for="floatingSelect">Select City</label>
                    <center className="text-center">
                      <button className="btn btn-primary m-4">Submit</button>
                    </center>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
