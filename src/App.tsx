import { useEffect, useMemo, useReducer } from "react"
import Form from "./components/Form"
import { activityReducer, initialState } from "./reducers/activity-reducer"
import ActivityList from "./components/ActivityList";
import CalorieTracker from "./components/CalorieTracker";

function App() {
  
  
  const [state, dispatch]=useReducer(activityReducer, initialState)

  useEffect(()=>{
    localStorage.setItem('activities',JSON.stringify(state.activities))
  },[state.activities])

  const canRestart=()=>useMemo(()=>state.activities.length > 0, [state.activities] )

  return (
    <>
      <header className=" bg-lime-600 py-3">
        <div className=" max-w-4xl mx-auto flex justify-between">
          <div className="flex">
          <img src='/calories-svgrepo-black.svg' alt="logo" className=" h-7 mr-4"/>
          <h1 className="text-center text-lg font-bold text-white uppercase">Calories Counter</h1>
          </div>
          <button 
            className=" bg-gray-800 hover:bg-lime-50 rounded-md hover:text-gray-800 text-sm p-1 uppercase font-semibold text-lime-50  disabled:opacity-10 disabled:hover:bg-gray-800 disabled:hover:text-lime-50"
            disabled={!canRestart()}
            onClick={()=>dispatch({type:'reset-activities'})}
            >Restart App</button>
        </div>
       
      </header>
      <section className=" bg-lime-500 py-20 px-5 mt-1">
        <div className=" max-w-4xl mx-auto">
          <Form
            dispatch={dispatch}
            state={state}
          />
        </div>
      </section>
      <section className=" py-10 mt-1 bg-lime-600">
        <div className="max-w-4xl mx-auto">
          <CalorieTracker
            activities={state.activities}
          />
        </div>
      </section>

      <section className="p-10 mx-auto max-w-4xl">
        <ActivityList
          activities={state.activities}
          dispatch={dispatch}
        />
      </section>
      
    </>
  )
}

export default App
