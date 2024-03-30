import { Activity } from "../types"

export type ActivityActions=
    {type: 'save-activity', payload:{newActivity: Activity}} |
    {type: 'set-activeId', payload:{id: Activity['id']} } |
    {type: 'delete-activity', payload:{id: Activity['id']}} |
    {type: 'reset-activities'}


export type ActivityState={
    activities: Activity[]
    activeId: Activity['id']
}

const localSorageActivities= ():Activity[]=>{
    const activities= localStorage.getItem('activities')
    return activities? JSON.parse(activities):[]
}
export const initialState : ActivityState={
    activities: localSorageActivities(), 
    activeId: ''
}
export const activityReducer=(
    state: ActivityState = initialState,
    action: ActivityActions
)=>{
    switch (action.type) {
        case 'save-activity':
            // The code written here updates the state

            let updatedActivities: Activity[]=[]
            if(state.activeId){
                
                    updatedActivities = state.activities.map(activity => activity.id === state.activeId ? action.payload.newActivity : activity )
                    
            }else{
                updatedActivities = [...state.activities, action.payload.newActivity]
            }
            return {...state,
                activities: updatedActivities,
                activeId:''
            }

        case 'set-activeId':
            return{
                ...state,
                activeId: action.payload.id
            }
        case 'delete-activity':
            return{
                ...state,
                activities: state.activities.filter(activity => activity.id !== action.payload.id)
            }
        case "reset-activities":
            return{
                activities:[],
                activeId:''
            }
    }
    return state
}