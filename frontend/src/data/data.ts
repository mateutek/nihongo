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
        id: '5',
        japanese: { kana: 'はは', kanji: '母', romaji: 'ha.ha' },
        polish: 'matka'
    },
    {
        id: '6',
        japanese: { kana: 'あなた', kanji: '貴女', romaji: 'a.na.ta' },
        polish: 'ty'
    },
    {
        id: '7',
        japanese: { kana: 'あのひと', kanji: 'あの人', romaji: 'a.no.hi.to' },
        polish: 'on/ona'
    },
    {
        id: '8',
        japanese: { kana: 'せんせい', kanji: '先生', romaji: 'se.n.se.i' },
        polish: 'nauczyciel'
    },
    {
        id: '9',
        japanese: { kana: 'がくせい', kanji: '学生', romaji: 'ga.ku.se.i' },
        polish: 'uczeń'
    },
    {
        id: '10',
        japanese: { kana: 'かいしゃいん', kanji: '会社員', romaji: 'ka.i.sha.i.n' },
        polish: 'pracownik firmy'
    },
    {
        id: '11',
        japanese: { kana: 'ぎんこういん', kanji: '銀行員', romaji: 'gi.n.kō.i.n' },
        polish: 'pracownik banku'
    },
    {
        id: '12',
        japanese: { kana: 'いしゃ', kanji: '医者', romaji: 'i.shia' },
        polish: 'lekarz'
    },
    {
        id: '13',
        japanese: { kana: 'けんきょしゃ', kanji: '検挙者', romaji: 'ke.n.kyō.sha' },
        polish: 'naukowiec'
    },
    {
        id: '14',
        japanese: { kana: 'だいがく', kanji: '大学', romaji: 'da.i.ga.ku' },
        polish: 'uniwersytet'
    },
    {
        id: '15',
        japanese: { kana: 'びょういん', kanji: '病院', romaji: 'byō.i.n' },
        polish: 'szpital'
    },
    {
        id: '16',
        japanese: { kana: 'だれ', kanji: '-', romaji: 'da.re' },
        polish: 'kto'
    },
    {
        id: '17',
        japanese: { kana: 'ほん', kanji: '本', romaji: 'ho.n' },
        polish: 'książka'
    },
    {
        id: '18',
        japanese: { kana: 'じしょ', kanji: '辞書', romaji: 'ji.sho' },
        polish: 'słownik'
    },
    {
        id: '19',
        japanese: { kana: 'ざっし', kanji: '雑誌', romaji: 'zas.shi' },
        polish: 'magazyn'
    },
    {
        id: '20',
        japanese: { kana: 'しんぶん', kanji: '新聞', romaji: 'shi.n.bu.n' },
        polish: 'gazeta'
    },
    {
        id: '21',
        japanese: { kana: 'ノート', kanji: '-', romaji: 'nō.to' },
        polish: 'zeszyt'
    },
    {
        id: '22',
        japanese: { kana: 'てちょう', kanji: '手帳', romaji: 'te.chō' },
        polish: 'organizer'
    },
    {
        id: '23',
        japanese: { kana: 'めいし', kanji: '名刺', romaji: 'me.i.shi' },
        polish: 'wizytówka'
    },
    {
        id: '24',
        japanese: { kana: 'カート', kanji: '', romaji: 'kā.to' },
        polish: 'karta kredytowa'
    },
    {
        id: '25',
        japanese: { kana: 'えんぴつ', kanji: '鉛筆', romaji: 'e.n.pi.tsu' },
        polish: 'ołówek'
    },
    {
        id: '26',
        japanese: { kana: 'ボールペン', kanji: '', romaji: 'bō.ru.pe.n' },
        polish: 'długopis'
    },
    {
        id: '27',
        japanese: { kana: 'シャープペンシル', kanji: '', romaji: 'shā.pu.pe.n.shi.ru' },
        polish: 'ołówek mechaniczny'
    },
    {
        id: '28',
        japanese: { kana: 'かぎ', kanji: '鍵', romaji: 'ka.gi' },
        polish: 'klucz'
    },
    {
        id: '29',
        japanese: { kana: 'とけい', kanji: '時計', romaji: 'to.ka.i' },
        polish: 'zegarek'
    },
    {
        id: '30',
        japanese: { kana: 'かさ', kanji: '傘', romaji: 'ka.sa' },
        polish: 'parasol'
    },
    {
        id: '31',
        japanese: { kana: 'かばん', kanji: '', romaji: 'ka.ba.n' },
        polish: 'torba'
    },
    {
        id: '32',
        japanese: { kana: 'テレビ', kanji: '', romaji: 'te.re.bi' },
        polish: 'telewizja'
    },
    {
        id: '33',
        japanese: { kana: 'ラジオ', kanji: '', romaji: 'ra.ji.o' },
        polish: 'radio'
    },
    {
        id: '34',
        japanese: { kana: 'カメラ', kanji: '', romaji: 'ka.me.ra' },
        polish: 'aparat'
    },
    {
        id: '35',
        japanese: { kana: 'コンピューター', kanji: '', romaji: 'ko.n.pyū.tā' },
        polish: 'komputer'
    },
    {
        id: '36',
        japanese: { kana: 'つくえ', kanji: '机', romaji: 'tsu.ku.e' },
        polish: 'biurko'
    },
    {
        id: '37',
        japanese: { kana: 'いす', kanji: '', romaji: 'i.su' },
        polish: 'krzesło'
    },
    {
        id: '38',
        japanese: { kana: 'みやげ', kanji: '土産', romaji: 'mi.ya.ge' },
        polish: 'prezent'
    },
    {
        id: '39',
        japanese: { kana: 'ここ', kanji: '', romaji: 'ko.ko' },
        polish: 'tutaj'
    },
    {
        id: '40',
        japanese: { kana: 'そこ', kanji: '', romaji: 'so.ko' },
        polish: 'tam'
    },
    {
        id: '41',
        japanese: { kana: 'あそこ', kanji: '', romaji: 'a.so.ko' },
        polish: 'tamto'
    },
    {
        id: '42',
        japanese: { kana: 'どこ', kanji: '', romaji: 'do.ko' },
        polish: 'gdzie'
    },
    {
        id: '43',
        japanese: { kana: 'こちら', kanji: '', romaji: 'ko.chi.ra' },
        polish: 'w tą stronę'
    },
    {
        id: '44',
        japanese: { kana: 'そちら', kanji: '', romaji: 'so.chi.ra' },
        polish: 'tędy (blisko słuchacza)'
    },
    {
        id: '45',
        japanese: { kana: 'あちら', kanji: '', romaji: 'a.chi.ra' },
        polish: 'tamtędy'
    },
    {
        id: '46',
        japanese: { kana: 'どちら', kanji: '', romaji: 'do.chi.ra' },
        polish: 'którędy'
    },
    {
        id: '47',
        japanese: { kana: 'きょうしつ', kanji: '教室', romaji: 'kyō.shi.tsu' },
        polish: 'klasa'
    },
    {
        id: '48',
        japanese: { kana: 'しょくどう', kanji: '食堂', romaji: 'sho.ku.dō' },
        polish: 'stołówka'
    },
    {
        id: '49',
        japanese: { kana: 'じむしょ', kanji: '事務所', romaji: 'ji.mu.sho' },
        polish: 'biuro'
    },
    {
        id: '50',
        japanese: { kana: 'かいぎしつ', kanji: '会議室', romaji: 'ka.i.gi.shi.tsu' },
        polish: 'sala konferencyjna'
    },
    {
        id: '51',
        japanese: { kana: 'うけつけ', kanji: '受付', romaji: 'u.ke.tsu.ke' },
        polish: 'recepcja'
    },
    {
        id: '52',
        japanese: { kana: 'ロビー', kanji: '', romaji: 'ro.bii' },
        polish: 'lobby'
    },
    {
        id: '53',
        japanese: { kana: 'へや', kanji: '部屋', romaji: 'he.ya' },
        polish: 'pokój'
    },
    {
        id: '54',
        japanese: { kana: 'トイレ', kanji: '', romaji: 'to.i.re' },
        polish: 'toaleta'
    },
    {
        id: '55',
        japanese: { kana: 'かいだん', kanji: '階段', romaji: 'ka.i.da.n' },
        polish: 'schody'
    },
    {
        id: '56',
        japanese: { kana: 'エラベーター', kanji: '', romaji: 'e.re.bē.tā' },
        polish: 'winda'
    },
    {
        id: '57',
        japanese: { kana: 'エスカレーター', kanji: '', romaji: 'e.su.ka.rē.tā' },
        polish: 'schody ruchome'
    },
    {
        id: '58',
        japanese: { kana: 'じどうはんばいき', kanji: '自動販売機', romaji: 'ji.dō.ha.n.ba.i.ki' },
        polish: 'automat'
    },
    {
        id: '59',
        japanese: { kana: 'でんわ', kanji: '電話', romaji: 'de.n.wa' },
        polish: 'rozmowa telefoniczna'
    },
    {
        id: '60',
        japanese: { kana: 'くに', kanji: '国', romaji: 'ku.ni' },
        polish: 'kraj'
    },
    {
        id: '61',
        japanese: { kana:'かいしゃ', kanji: '会社', romaji: 'ka.i.sha' },
        polish: 'firma'
    },
    {
        id: '62',
        japanese: { kana: 'うち', kanji: '', romaji: 'u.chi' },
        polish: 'dom'
    },
    {
        id: '63',
        japanese: { kana: 'くつ', kanji: '靴', romaji: 'ku.tsu' },
        polish: 'buty'
    },
    {
        id: '64',
        japanese: { kana: 'ネクタイ', kanji: '', romaji: 'ne.ku.ta.i' },
        polish: 'krawat'
    },
    {
        id: '65',
        japanese: { kana: 'ワイン', kanji: '', romaji: 'wa.i.n' },
        polish: 'wino'
    },
    {
        id: '66',
        japanese: { kana: 'うりば', kanji: '売り場', romaji: 'u.ri.ba' },
        polish: 'dział'
    },
    {
        id: '67',
        japanese: { kana: 'ちか', kanji: '地下', romaji: 'chi.ka' },
        polish: 'piwnica'
    },
    {
        id: '68',
        japanese: { kana: '-かい', kanji: '-階', romaji: '- ka.i' },
        polish: 'n-te piętro'
    },
    {
        id: '69',
        japanese: { kana: 'なんがい', kanji: '何階', romaji: 'na.n.ga.i' },
        polish: 'które piętro'
    },
    {
        id: '70',
        japanese: { kana: '-えん', kanji: '-円', romaji: '- e.n' },
        polish: '- yen'
    },
    {
        id: '71',
        japanese: { kana: 'いくら', kanji: '', romaji: 'i.ku.ra' },
        polish: 'jak dużo'
    },
    {
        id: '72',
        japanese: { kana: 'ひゃく', kanji: '百', romaji: 'hya.ku' },
        polish: 'sto'
    },
    {
        id: '73',
        japanese: { kana: 'せん', kanji: '千', romaji: 'se.n' },
        polish: 'tysiąc'
    },
    {
        id: '74',
        japanese: { kana: 'まん', kanji: '万', romaji: 'ma.n' },
        polish: 'dziesięć tysięcy'
    },
    {
        id: '75',
        japanese: { kana: 'すみません。', kanji: '', romaji: 'su.mi.ma.se.n' },
        polish: 'przepraszam'
    },
    {
        id: '76',
        japanese: { kana: 'どうも', kanji: '', romaji: 'dō.mo' },
        polish: 'dziękuję'
    }
]


export default questionsData;
