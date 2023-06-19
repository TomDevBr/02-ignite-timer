import { useEffect, useState } from "react";
import { Separator } from "./style";
import { CountdownContainer } from "./style";

export default function Countdown(){
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0);
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

    return (
        <CountdownContainer>
        <span>{minutes[0]}</span>
        <span>{minutes[1]}</span>
        <Separator>:</Separator>
        <span>{seconds[0]}</span>
        <span>{seconds[1]}</span>
      </CountdownContainer>

    )
}