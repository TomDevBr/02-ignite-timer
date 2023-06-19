import { HandPalm, Play } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { differenceInSeconds } from 'date-fns'

import {
  HomeContainer,
  StartCountdownButton,
  StopCountdownButton,

} from './style'
import { createContext, useEffect, useState } from 'react'
import NewCycleForm from './components/NewCycleForm'
import Countdown from './components/Countdown'


// interface NewCycleFormData {
//   task: string,
//   minutesAmount: number,
// }



interface Cycle {
  id: string;
  task: string;
  minutesAmount: number;
  startDate: Date;
  interruptedDate?: Date;
  finishedDate?: Date;
}

interface CyclesContextType {
  activeCycle: Cycle | undefined
  activeCycleId: string | null
  markCurrentCycleAsFinished: () => void
}

export const CyclesContext = createContext({} as CyclesContextType )

export function Home() {
  const [cycles, setCycles] = useState<Cycle[]>([]);
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null);


  function markCurrentCycleAsFinished() {
    setCycles(
      state => state.map(state => {
        if (state.id === activeCycleId) {
          return { ...state, interruptedDate: new Date() }
        } else {
          return state
        }
      })
    )
  }




  // function handleCreateNewCycle(data: NewCycleFormData) {

  //   const id = String(new Date().getTime());

  //   const newCycle: Cycle = {
  //     id,
  //     task: data.task,
  //     minutesAmount: data.minutesAmount,
  //     startDate: new Date(),
  //   };

  //   setCycles(state => ([...state, newCycle]));
  //   setActiveCycleId(id);
  //   setAmountSecondsPassed(0)
  //   reset();
  // }


  const activeCycle = cycles.find(cycles => cycles.id === activeCycleId);




  function handleInterruptCycle() {
    // setCycles(
    //   state => state.map(state => {
    //     if (state.id === activeCycleId) {
    //       return { ...state, interruptedDate: new Date() }
    //     } else {
    //       return state
    //     }
    //   })
    // )

    setActiveCycleId(null)
  }
  // const task = watch('task');
  // const isSubmitDisable = !task;





  return (
    <HomeContainer>
      <form /*onSubmit={handleSubmit(handleCreateNewCycle)}*/ action=''>
        <CyclesContext.Provider value={{ activeCycle, activeCycleId, markCurrentCycleAsFinished}}>
        {/* <NewCycleForm/> */}
        <Countdown />
        </CyclesContext.Provider>

 
        {activeCycle ?
          (<StopCountdownButton onClick={handleInterruptCycle} type="button">
            <HandPalm size={24} />
            Interromper
          </StopCountdownButton>) :
          <StartCountdownButton /*disabled={isSubmitDisable}*/ type="submit">
            <Play size={24} />
            Começar
          </StartCountdownButton>
        }
      </form>
    </HomeContainer>
  )
}