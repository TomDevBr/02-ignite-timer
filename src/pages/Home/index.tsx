import { HandPalm, Play } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { differenceInSeconds } from 'date-fns'
import * as zod from 'zod'
import {
  HomeContainer,
  StartCountdownButton,
  StopCountdownButton,

} from './style'
import { useEffect, useState } from 'react'
import NewCycleForm from './components/NewCycleForm'
import Countdown from './components/Countdown'

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  minutesAmount: zod
    .number()
    .min(5, 'O ciclo precisa ser de no mínimo 5 minutos.')
    .max(60, 'O ciclo precisa ser de no maxímo 60 minutos'),
})

// interface NewCycleFormData {
//   task: string,
//   minutesAmount: number,
// }

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

interface Cycle {
  id: string;
  task: string;
  minutesAmount: number;
  startDate: Date;
  interruptedDate?: Date;
  finishedDate?: Date;
}
export function Home() {
  const [cycles, setCycles] = useState<Cycle[]>([]);
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null);
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0);

  const { register, handleSubmit, watch, reset } = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      minutesAmount: 0,
      task: ''
    }
  });


  function handleCreateNewCycle(data: NewCycleFormData) {

    const id = String(new Date().getTime());

    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    };

    setCycles(state => ([...state, newCycle]));
    setActiveCycleId(id);
    setAmountSecondsPassed(0)
    reset();
  }


  const activeCycle = cycles.find(cycles => cycles.id === activeCycleId);
  let interval: number;

  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0;
  useEffect(() => {
    if (activeCycle) {
      interval = setInterval(() => {

        const secondsDifference = differenceInSeconds(new Date(), activeCycle.startDate);

        if (secondsDifference >= totalSeconds) {
          setCycles(
            state => state.map(cycle => {
              if (cycle.id === activeCycleId) {
                return { ...cycle, finishedDate: new Date() }
              } else {
                return cycle
              }
            })
          )
          setAmountSecondsPassed(totalSeconds)
          clearInterval(interval)
        } else {
          setAmountSecondsPassed(
            secondsDifference
          )
        }

      }, 1000)

      return () => {
        clearInterval(interval);
      }
    }

  }, [activeCycle, activeCycle, totalSeconds])





  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0;
  const minutesAmount = Math.floor(currentSeconds / 60);
  const secondsAmount = currentSeconds % 60;

  const minutes = String(minutesAmount).padStart(2, '0');
  const seconds = String(secondsAmount).padStart(2, '0');

  useEffect(() => {
    if (activeCycle) {
      document.title = `${minutes}:${seconds}`
    }
  }, [seconds, minutes, activeCycle]);

  function handleInterruptCycle() {
    setCycles(
      state => state.map(state => {
        if (state.id === activeCycleId) {
          return { ...state, interruptedDate: new Date() }
        } else {
          return state
        }
      })
    )

    setActiveCycleId(null)
  }
  const task = watch('task');
  const isSubmitDisable = !task;

  console.log(cycles);

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)} action=''>
        <NewCycleForm/>
        <Countdown />

 
        {activeCycle ?
          (<StopCountdownButton onClick={handleInterruptCycle} type="button">
            <HandPalm size={24} />
            Interromper
          </StopCountdownButton>) :
          <StartCountdownButton disabled={isSubmitDisable} type="submit">
            <Play size={24} />
            Começar
          </StartCountdownButton>
        }
      </form>
    </HomeContainer>
  )
}