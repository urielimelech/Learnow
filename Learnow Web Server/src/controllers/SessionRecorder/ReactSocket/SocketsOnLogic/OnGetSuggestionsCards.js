import { SuggestionFeedback } from '../../../Feedback/SuggestionFeedback/index.js'

export const onGetSuggestionsCards = (soc, email) => {
    soc.emit('suggestions cards', SuggestionFeedback)
}