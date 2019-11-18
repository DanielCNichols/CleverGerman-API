const LanguageService = {
  getUsersLanguage(db, user_id) {
    return db
      .from('language')
      .select(
        'language.id',
        'language.name',
        'language.user_id',
        'language.head',
        'language.total_score',
      )
      .where('language.user_id', user_id)
      .first()
  },

  getLanguageWords(db, language_id) {
    return db
      .from('word')
      .select(
        'id',
        'language_id',
        'original',
        'translation',
        'next',
        'memory_value',
        'correct_count',
        'incorrect_count',
      )
      .where({ language_id })
  },

  getNextWord(db, language_id, user_id) {
    return db
      .from('word')
      .select(
        'word.original as nextWord',
        'language.total_score as totalScore',
        'word.correct_count as wordCorrectCount',
        'word.incorrect_count as wordIncorrectCount',
      )
      .join('language', 'word.language_id', '=', 'language.id')
      .join('users', 'users.id', '=', 'language.user_id')
      .where('users.id', user_id)
      .andWhere('word.language_id', language_id)
      .andWhere('word.next', 2)
      .first()
      .groupBy(
        'nextWord',
        'wordCorrectCount',
        'wordIncorrectCount',
        'totalScore'
      )
  }
}

module.exports = LanguageService