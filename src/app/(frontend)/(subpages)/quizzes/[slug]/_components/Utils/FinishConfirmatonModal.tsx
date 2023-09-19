import Modal from "@/app/(frontend)/_components/Modal"
import { QuizStateInterface } from "../../_definition";
import { useRouter } from "next/navigation";

interface FinishConfirmatonModalProps {
  isOpen: boolean;
  handleFinishQuiz: () => void;
  handleCloseModal: () => void;
  status: QuizStateInterface['status'];
}

const FinishConfirmatonModal = (props: FinishConfirmatonModalProps) => {
  const { isOpen, handleCloseModal, handleFinishQuiz, status } = props;
  const router = useRouter()

  return (
    <Modal isOpen={isOpen}>
      <div className='flex flex-col gap-4'>
        {status === 'finished' ?
          <>
            <h1 className='text-2xl'>Quiz has been submitted!</h1>
            <p className='text-center'>Click the button to see your result</p>
            <button onClick={() => {
              handleCloseModal()
              router.push('/quizzes/result')
            }} className='btn-primary'>See Result</button>
          </> : <>
            <h1 className='text-2xl text-center'>Are you sure you want to finish the quiz?</h1>
            <p className='text-center'>You can not go back once you finish the quiz</p>
            <div className='flex gap-4 justify-center'>
              <button onClick={handleFinishQuiz} className='btn-primary' disabled={status === 'loading' ? true : false}>Yes</button>
              <button onClick={handleCloseModal} className='btn-primary'>No</button>
            </div>
          </>}
      </div>
    </Modal>
  )
}

export default FinishConfirmatonModal