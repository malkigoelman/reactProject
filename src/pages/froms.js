import { useState } from "react";

// טופס להרשמה וטופס כניסה
function Enrollment() {
    const [inputFields, setInputFields] = useState([
        {name: '', age: ''}
    ])
    return (
        <div className="App">
            <form>
                <div>
                    <input
                        name='name'
                        placeholder='Name'
                    />
                    <input
                        name='password'
                        placeholder='password'
                    />
                    <input
                        name='phon'
                        placeholder='phon'
                    />
                    <input
                        name='email'
                        placeholder='email'
                    />
                </div>
            </form>
        </div>
    );
}


// טופס לכניסה
function Entrance() {
    const [inputFields, setInputFields] = useState([
        { name: '', age: '' }
      ])
      return (
        <div className="App">
          <form>
            {inputFields.map((input, index) => {
              return (
                <div key={index}>
                  <input
                    name='name'
                    placeholder='Name'
                  />
                  <input
                    name='password'
                    placeholder='password'
                  />
                </div>
              )
            })}
          </form>
        </div>
      );
}

export default App;

