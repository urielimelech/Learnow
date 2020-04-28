export const sessionConfig = () => {
    const config = {
        comparator_diff_lowest_attention: 0,
        comparator_diff_highest_attention: 0,
        comparator_diff_lowest_meditation: 0,
        comparator_diff_highest_meditation: 0,
        comparator_diff_avarage_attention: 0,
        comparator_diff_avarage_meditation: 0,

        correlator_range_of_seconds: 5,

        feedback_result_balance: 50,

        analyzer_lowest_attention_range: 10,
        analyzer_lowest_meditation_range: 10,
        analyzer_highest_attention_range: 10,
        analyzer_highest_meditation_range: 10,

        active_session_avarage_after_seconds: 30
    }
    return config
}