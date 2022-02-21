export type DataJapanese = {
  kana: string,
  kanji: string,
  romaji: string
}

export type DataDao = Array<{
  id: string,
  japanese: DataJapanese,
  polish: string,
}>;

// {
//   japanese: {
//   kana: "",
//     kanji: "",
//     romaji: ""
// },
//   polish: ""
// },


const questionsData: DataDao = [
  {
    id: '1',
    japanese: { kana: 'わたし', kanji: '私', romaji: 'wa.ta.shi' },
    polish: 'ja'
  },
  {
    id: '2',
    japanese: { kana: 'くるま', kanji: '車', romaji: 'ku.ru.ma' },
    polish: 'samochód'
  },
  {
    id: '3',
    japanese: { kana: 'かぞく', kanji: '家族', romaji: 'ka.zo.ku' },
    polish: 'rodzina'
  },
  {
    id: '4',
    japanese: { kana: 'ちち', kanji: '父', romaji: 'chi.chi' },
    polish: 'ojciec'
  },
  {
    id: '',
    japanese: { kana: 'はは', kanji: '母', romaji: 'ha.ha' },
    polish: 'matka'
  },
  {
    id: '5',
    japanese: { kana: 'あなた', kanji: '貴女', romaji: 'a.na.ta' },
    polish: 'ty'
  },
  {
    id: '6',
    japanese: { kana: 'あのひと', kanji: 'あの人', romaji: 'a.no.hi.to' },
    polish: 'on/ona'
  },
  {
    id: '7',
    japanese: { kana: 'せんせい', kanji: '先生', romaji: 'se.n.se.i' },
    polish: 'nauczyciel'
  },
  {
    id: '8',
    japanese: { kana: 'がくせい', kanji: '学生', romaji: 'ga.ku.se.i' },
    polish: 'uczeń'
  },
  {
    id: '9',
    japanese: { kana: 'かいしゃいん', kanji: '会社員', romaji: 'ka.i.shia.i.n' },
    polish: 'pracownik firmy'
  },
  {
    id: '10',
    japanese: { kana: 'ぎんこういん', kanji: '銀行員', romaji: 'gi.n.kō.i.n' },
    polish: 'pracownik banku'
  },
  {
    id: '11',
    japanese: { kana: 'いしゃ', kanji: '医者', romaji: 'i.shia' },
    polish: 'lekarz'
  },
  {
    id: '12',
    japanese: { kana: 'けんきょしゃ', kanji: '検挙者', romaji: 'ke.n.kyō.shia' },
    polish: 'naukowiec'
  },
  {
    id: '13',
    japanese: { kana: 'だいがく', kanji: '大学', romaji: 'da.i.ga.ku' },
    polish: 'uniwersytet'
  },
  {
    id: '14',
    japanese: { kana: 'びょういん', kanji: '病院', romaji: 'byō.i.n' },
    polish: 'szpital'
  },
  {
    id: '15',
    japanese: { kana: 'だれ', kanji: '-', romaji: 'da.re' },
    polish: 'kto'
  },
  {
    id: '16',
    japanese: { kana: 'ほん', kanji: '本', romaji: 'ho.n' },
    polish: 'książka'
  },
  {
    id: '17',
    japanese: { kana: 'じしょ', kanji: '辞書', romaji: 'ji.sho' },
    polish: 'słownik'
  },
  {
    id: '18',
    japanese: { kana: 'ざっし', kanji: '雑誌', romaji: 'zas.shi' },
    polish: 'magazyn'
  },
  {
    id: '19',
    japanese: { kana: 'しんぶん', kanji: '新聞', romaji: 'shi.n.bu.n' },
    polish: 'gazeta'
  },
  {
    id: '20',
    japanese: { kana: 'ノート', kanji: '-', romaji: 'nō.to' },
    polish: 'zeszyt'
  },
  {
    id: '21',
    japanese: { kana: 'てちょう', kanji: '手帳', romaji: 'te.chō' },
    polish: 'organizer'
  },
  {
    id: '22',
    japanese: { kana: 'めいし', kanji: '名刺', romaji: 'me.i.shi' },
    polish: 'wizytówka'
  },
  {
    id: '23',
    japanese: { kana: 'カート', kanji: '', romaji: 'kā.to' },
    polish: 'karta kredytowa'
  },
  {
    id: '24',
    japanese: { kana: 'えんぴつ', kanji: '鉛筆', romaji: 'e.n.pi.tsu' },
    polish: 'ołówek'
  },
  {
    id: '25',
    japanese: { kana: 'ボールペン', kanji: '', romaji: 'bō.ru.pe.n' },
    polish: 'długopis'
  },
  {
    id: '26',
    japanese: { kana: 'シャープペンシル', kanji: '', romaji: 'shā.pu.pe.n.shi.ru' },
    polish: 'ołówek mechaniczny'
  },
  {
    id: '27',
    japanese: { kana: 'かぎ', kanji: '鍵', romaji: 'ka.gi' },
    polish: 'klucz'
  },
  {
    id: '28',
    japanese: { kana: 'とけい', kanji: '時計', romaji: 'to.ka.i' },
    polish: 'zegarek'
  },
  {
    id: '29',
    japanese: { kana: 'かさ', kanji: '傘', romaji: 'ka.sa' },
    polish: 'parasol'
  },
  {
    id: '30',
    japanese: { kana: 'かばん', kanji: '', romaji: 'ka.ba.n' },
    polish: 'torba'
  },
  {
    id: '31',
    japanese: { kana: 'テレビ', kanji: '', romaji: 'te.re.bi' },
    polish: 'telewizja'
  },
  {
    id: '32',
    japanese: { kana: 'ラジオ', kanji: '', romaji: 'ra.ji.o' },
    polish: 'radio'
  },
  {
    id: '33',
    japanese: { kana: 'カメラ', kanji: '', romaji: 'ka.me.ra' },
    polish: 'aparat'
  },
  {
    id: '34',
    japanese: { kana: 'コンピューター', kanji: '', romaji: 'ko.n.pyū.tā' },
    polish: 'komputer'
  },
  {
    id: '35',
    japanese: { kana: 'つくえ', kanji: '机', romaji: 'tsu.ku.e' },
    polish: 'biurko'
  },
  {
    id: '36',
    japanese: { kana: 'いす', kanji: '', romaji: 'i.su' },
    polish: 'krzesło'
  }
]


export default questionsData;