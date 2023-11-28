import {ButtonsWrapper, ButtonWrapper, EventBody, EventTitle, FormPositionWrapper, FormWrapper} from "../../containers/StyledComponents";


export const CreateEventForm = ({cancelButtonHandler, event, changeEventHandler, eventFetchHandler, method, removeEventHandler}) => {

  return (
    <FormPositionWrapper onClick={cancelButtonHandler}>
            <FormWrapper onClick={e => e.stopPropagation()}>
              <EventTitle
                value={event?.title}
                onChange={e => changeEventHandler(e.target.value, 'title')}
                placeholder="Title"
              />
              <EventBody
                value={event?.description}
                onChange={e => changeEventHandler(e.target.value, 'description')}
                placeholder="Description"
              />
              <ButtonsWrapper>
                <ButtonWrapper onClick={cancelButtonHandler} >Cancel</ButtonWrapper>
                <ButtonWrapper onClick={eventFetchHandler}>{method}</ButtonWrapper>
                {
                  method === 'Update' ? (
                    <ButtonWrapper danger onClick={removeEventHandler}>Remove</ButtonWrapper>
                  ) : null
                }
              </ButtonsWrapper>
            </FormWrapper>
          </FormPositionWrapper>
  )
}