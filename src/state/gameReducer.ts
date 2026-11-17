import { nextPartyEmojiIndex } from '../lib/bingo'
import {
  type GameAction,
  type GameSnapshot,
  initialState,
} from './types'

export function gameReducer(
  state: GameSnapshot,
  action: GameAction,
): GameSnapshot {
  switch (action.type) {
    case 'HYDRATE':
      return action.snapshot

    case 'TOGGLE_NUMBER': {
      if (
        state.gameState === 'REVIEW' ||
        state.gameState === 'FALSE' ||
        state.gameState === 'WINNER'
      ) {
        return state
      }
      const n = action.number
      const idx = state.calledStack.indexOf(n)
      if (idx === -1) {
        return { ...state, calledStack: [...state.calledStack, n] }
      }
      return {
        ...state,
        calledStack: state.calledStack.filter((_, i) => i !== idx),
      }
    }

    case 'SET_PRIZE': {
      const next = action.prizeText
      const cleared =
        state.prizeText.trim() !== '' && next.trim() === ''
      return {
        ...state,
        prizeText: next,
        partyEmojiIndex: cleared
          ? nextPartyEmojiIndex(state.partyEmojiIndex)
          : state.partyEmojiIndex,
      }
    }

    case 'CLEAR_PRIZE':
      return {
        ...state,
        prizeText: '',
        partyEmojiIndex:
          state.prizeText.trim() !== ''
            ? nextPartyEmojiIndex(state.partyEmojiIndex)
            : state.partyEmojiIndex,
      }

    case 'BINGO':
      if (state.isPaused || state.gameState !== 'PLAY') return state
      return { ...state, gameState: 'REVIEW' }

    case 'FALSE_ALARM':
    case 'WINNER': {
      if (state.isPaused) return state
      const inReviewFlow =
        state.gameState === 'REVIEW' ||
        state.gameState === 'FALSE' ||
        state.gameState === 'WINNER'
      if (!inReviewFlow) return state
      const target = action.type === 'FALSE_ALARM' ? 'FALSE' : 'WINNER'
      return {
        ...state,
        gameState: state.gameState === target ? 'REVIEW' : target,
      }
    }

    case 'RESUME_PLAY':
      if (state.isPaused) {
        return { ...state, isPaused: false }
      }
      return { ...state, gameState: 'PLAY' }

    case 'PAUSE':
      return { ...state, isPaused: true }

    case 'UNPAUSE':
      return { ...state, isPaused: false }

    case 'RESET':
      return {
        ...initialState,
        partyEmojiIndex: nextPartyEmojiIndex(state.partyEmojiIndex),
      }

    default:
      return state
  }
}
