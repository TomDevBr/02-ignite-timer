import { Play } from "phosphor-react";
import { CountDownContainer, FormContainer, HomeContainer, Separator } from "./style";

export function Home() {
  return (
    <HomeContainer>
      <form action="">
        <FormContainer>
          <label htmlFor="task">Vou Trabalhar em</label>
          <input type="number" id="task" />

          <label htmlFor="minutesAmount">Durante</label>
          <input type="number" id="minutesAmount" />

          <span>minutos.</span>
        </FormContainer>

        <CountDownContainer>
          <span>0</span>
          <span>0</span>
          <Separator>:</Separator>
          <span>0</span>
          <span>0</span>
        </CountDownContainer>

        <button type="submit">
          <Play size={24} />
        </button>
      </form>
    </HomeContainer>
  );
}
