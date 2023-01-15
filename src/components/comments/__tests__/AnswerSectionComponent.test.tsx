import * as React from 'react'
import { store } from '@redux/store'
import { Provider } from 'react-redux'
import { render, screen } from '@testing-library/react'
import { AnswerSectionComponentInterface } from '@components/types'
import AnswerSectionComponent from '@components/comments/AnswerSectionComponent'

const answers = [{
    'by': 'author',
    'id': 2921983,
    'kids': [ 2922097, 2922429, 2924562, 2922709, 2922573, 2922140, 2922141 ],
    'parent': 2921506,
    'text': 'Some text',
    'time': 1314211127,
    'type': 'comment'
}]

const answerSectionComponent = (
  { answers, isCollapsed, isLoading }: AnswerSectionComponentInterface
): JSX.Element =>
  <Provider store={ store }>
    <AnswerSectionComponent
      answers={ answers }
      isCollapsed={ isCollapsed }
      isLoading={ isLoading }
    />
  </Provider>

describe('AnswerSectionComponent test', () => {
  test('AnswerSectionComponent should to match snapshot', () => {
    const props = {
      answers,
      isCollapsed: false,
      isLoading: false
    }

    render(answerSectionComponent(props))
    expect(answerSectionComponent(props)).toMatchSnapshot()
  })

  test('renders AnswerSectionComponent when data loaded', () => {
    const props = {
      answers,
      isCollapsed: false,
      isLoading: false
    }

    render(answerSectionComponent(props))

    const answersInAnswerSectionComponent = screen.getByTestId('answers')
    expect(answersInAnswerSectionComponent).toBeInTheDocument()

    const showAnswersButtonInAnswerSectionComponent = screen.getByText('Show answers')
    expect(showAnswersButtonInAnswerSectionComponent).toBeInTheDocument()
  })

  test('renders AnswerSectionComponent when data is loading', () => {
    const props = {
      answers,
      isCollapsed: false,
      isLoading: true
    }

    render(answerSectionComponent(props))

    const loaderInAnswerSectionComponent = screen.getByTestId('loader')
    expect(loaderInAnswerSectionComponent).toBeInTheDocument()
  })
})