import { Component, OnInit } from '@angular/core';
import { MatChipInputEvent } from '@angular/material/chips';
import { UserserviceService } from 'src/services/users/userservice.service';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { GlobalsService } from 'src/services/globals.service';

@Component({
  selector: 'app-language-region',
  templateUrl: './language-region.component.html',
  styleUrls: ['./language-region.component.css']
})
export class LanguageRegionComponent implements OnInit {
  lang : any = '';
  timezone : any = '';
  langChips : any = [];
  selectable = true;
  removable = true;
  roaster_id: any;
  user_id: any;
  firstName: any;
  languageError: string;
  timeZoneError: string;
  lastName: any;
  email: any;
  phone: any;
  dateOfBirth: any;
  gender: any;
  address1: any;
  address2: any;
  state: any;
  country: any;
  city: any;
  displayModal: boolean;
  appLanguage?: any;
  langActive:any =0;
  languageCode:any=[];
  languages:any;
  langName:any;

  languageCodeArray : Array<any> = [
    {
      "code": "aa",
      "name": "Afar",
      "native": "Afar"
    },
    {
      "code": "ab",
      "name": "Abkhazian",
      "native": "Аҧсуа"
    },
    {
      "code": "af",
      "name": "Afrikaans",
      "native": "Afrikaans"
    },
    {
      "code": "ak",
      "name": "Akan",
      "native": "Akana"
    },
    {
      "code": "am",
      "name": "Amharic",
      "native": "አማርኛ"
    },
    {
      "code": "an",
      "name": "Aragonese",
      "native": "Aragonés"
    },
    {
      "code": "ar",
      "name": "Arabic",
      "native": "العربية",
      "rtl": 1
    },
    {
      "code": "as",
      "name": "Assamese",
      "native": "অসমীয়া"
    },
    {
      "code": "av",
      "name": "Avar",
      "native": "Авар"
    },
    {
      "code": "ay",
      "name": "Aymara",
      "native": "Aymar"
    },
    {
      "code": "az",
      "name": "Azerbaijani",
      "native": "Azərbaycanca / آذربايجان"
    },
    {
      "code": "ba",
      "name": "Bashkir",
      "native": "Башҡорт"
    },
    {
      "code": "be",
      "name": "Belarusian",
      "native": "Беларуская"
    },
    {
      "code": "bg",
      "name": "Bulgarian",
      "native": "Български"
    },
    {
      "code": "bh",
      "name": "Bihari",
      "native": "भोजपुरी"
    },
    {
      "code": "bi",
      "name": "Bislama",
      "native": "Bislama"
    },
    {
      "code": "bm",
      "name": "Bambara",
      "native": "Bamanankan"
    },
    {
      "code": "bn",
      "name": "Bengali",
      "native": "বাংলা"
    },
    {
      "code": "bo",
      "name": "Tibetan",
      "native": "བོད་ཡིག / Bod skad"
    },
    {
      "code": "br",
      "name": "Breton",
      "native": "Brezhoneg"
    },
    {
      "code": "bs",
      "name": "Bosnian",
      "native": "Bosanski"
    },
    {
      "code": "ca",
      "name": "Catalan",
      "native": "Català"
    },
    {
      "code": "ce",
      "name": "Chechen",
      "native": "Нохчийн"
    },
    {
      "code": "ch",
      "name": "Chamorro",
      "native": "Chamoru"
    },
    {
      "code": "co",
      "name": "Corsican",
      "native": "Corsu"
    },
    {
      "code": "cr",
      "name": "Cree",
      "native": "Nehiyaw"
    },
    {
      "code": "cs",
      "name": "Czech",
      "native": "Česky"
    },
    {
      "code": "cu",
      "name": "Old Church Slavonic / Old Bulgarian",
      "native": "словѣньскъ / slověnĭskŭ"
    },
    {
      "code": "cv",
      "name": "Chuvash",
      "native": "Чăваш"
    },
    {
      "code": "cy",
      "name": "Welsh",
      "native": "Cymraeg"
    },
    {
      "code": "da",
      "name": "Danish",
      "native": "Dansk"
    },
    {
      "code": "de",
      "name": "German",
      "native": "Deutsch"
    },
    {
      "code": "dv",
      "name": "Divehi",
      "native": "ދިވެހިބަސް",
      "rtl": 1
    },
    {
      "code": "dz",
      "name": "Dzongkha",
      "native": "ཇོང་ཁ"
    },
    {
      "code": "ee",
      "name": "Ewe",
      "native": "Ɛʋɛ"
    },
    {
      "code": "el",
      "name": "Greek",
      "native": "Ελληνικά"
    },
    {
      "code": "en",
      "name": "English",
      "native": "English"
    },
    {
      "code": "eo",
      "name": "Esperanto",
      "native": "Esperanto"
    },
    {
      "code": "es",
      "name": "Spanish",
      "native": "Español"
    },
    {
      "code": "et",
      "name": "Estonian",
      "native": "Eesti"
    },
    {
      "code": "eu",
      "name": "Basque",
      "native": "Euskara"
    },
    {
      "code": "fa",
      "name": "Persian",
      "native": "فارسی",
      "rtl": 1
    },
    {
      "code": "ff",
      "name": "Peul",
      "native": "Fulfulde"
    },
    {
      "code": "fi",
      "name": "Finnish",
      "native": "Suomi"
    },
    {
      "code": "fj",
      "name": "Fijian",
      "native": "Na Vosa Vakaviti"
    },
    {
      "code": "fo",
      "name": "Faroese",
      "native": "Føroyskt"
    },
    {
      "code": "fr",
      "name": "French",
      "native": "Français"
    },
    {
      "code": "fy",
      "name": "West Frisian",
      "native": "Frysk"
    },
    {
      "code": "ga",
      "name": "Irish",
      "native": "Gaeilge"
    },
    {
      "code": "gd",
      "name": "Scottish Gaelic",
      "native": "Gàidhlig"
    },
    {
      "code": "gl",
      "name": "Galician",
      "native": "Galego"
    },
    {
      "code": "gn",
      "name": "Guarani",
      "native": "Avañe'ẽ"
    },
    {
      "code": "gu",
      "name": "Gujarati",
      "native": "ગુજરાતી"
    },
    {
      "code": "gv",
      "name": "Manx",
      "native": "Gaelg"
    },
    {
      "code": "ha",
      "name": "Hausa",
      "native": "هَوُسَ",
      "rtl": 1
    },
    {
      "code": "he",
      "name": "Hebrew",
      "native": "עברית",
      "rtl": 1
    },
    {
      "code": "hi",
      "name": "Hindi",
      "native": "हिन्दी"
    },
    {
      "code": "ho",
      "name": "Hiri Motu",
      "native": "Hiri Motu"
    },
    {
      "code": "hr",
      "name": "Croatian",
      "native": "Hrvatski"
    },
    {
      "code": "ht",
      "name": "Haitian",
      "native": "Krèyol ayisyen"
    },
    {
      "code": "hu",
      "name": "Hungarian",
      "native": "Magyar"
    },
    {
      "code": "hy",
      "name": "Armenian",
      "native": "Հայերեն"
    },
    {
      "code": "hz",
      "name": "Herero",
      "native": "Otsiherero"
    },
    {
      "code": "ia",
      "name": "Interlingua",
      "native": "Interlingua"
    },
    {
      "code": "id",
      "name": "Indonesian",
      "native": "Bahasa Indonesia"
    },
    {
      "code": "ie",
      "name": "Interlingue",
      "native": "Interlingue"
    },
    {
      "code": "ig",
      "name": "Igbo",
      "native": "Igbo"
    },
    {
      "code": "ii",
      "name": "Sichuan Yi",
      "native": "ꆇꉙ / 四川彝语"
    },
    {
      "code": "ik",
      "name": "Inupiak",
      "native": "Iñupiak"
    },
    {
      "code": "io",
      "name": "Ido",
      "native": "Ido"
    },
    {
      "code": "is",
      "name": "Icelandic",
      "native": "Íslenska"
    },
    {
      "code": "it",
      "name": "Italian",
      "native": "Italiano"
    },
    {
      "code": "iu",
      "name": "Inuktitut",
      "native": "ᐃᓄᒃᑎᑐᑦ"
    },
    {
      "code": "ja",
      "name": "Japanese",
      "native": "日本語"
    },
    {
      "code": "jv",
      "name": "Javanese",
      "native": "Basa Jawa"
    },
    {
      "code": "ka",
      "name": "Georgian",
      "native": "ქართული"
    },
    {
      "code": "kg",
      "name": "Kongo",
      "native": "KiKongo"
    },
    {
      "code": "ki",
      "name": "Kikuyu",
      "native": "Gĩkũyũ"
    },
    {
      "code": "kj",
      "name": "Kuanyama",
      "native": "Kuanyama"
    },
    {
      "code": "kk",
      "name": "Kazakh",
      "native": "Қазақша"
    },
    {
      "code": "kl",
      "name": "Greenlandic",
      "native": "Kalaallisut"
    },
    {
      "code": "km",
      "name": "Cambodian",
      "native": "ភាសាខ្មែរ"
    },
    {
      "code": "kn",
      "name": "Kannada",
      "native": "ಕನ್ನಡ"
    },
    {
      "code": "ko",
      "name": "Korean",
      "native": "한국어"
    },
    {
      "code": "kr",
      "name": "Kanuri",
      "native": "Kanuri"
    },
    {
      "code": "ks",
      "name": "Kashmiri",
      "native": "कश्मीरी / كشميري",
      "rtl": 1
    },
    {
      "code": "ku",
      "name": "Kurdish",
      "native": "Kurdî / كوردی",
      "rtl": 1
    },
    {
      "code": "kv",
      "name": "Komi",
      "native": "Коми"
    },
    {
      "code": "kw",
      "name": "Cornish",
      "native": "Kernewek"
    },
    {
      "code": "ky",
      "name": "Kirghiz",
      "native": "Kırgızca / Кыргызча"
    },
    {
      "code": "la",
      "name": "Latin",
      "native": "Latina"
    },
    {
      "code": "lb",
      "name": "Luxembourgish",
      "native": "Lëtzebuergesch"
    },
    {
      "code": "lg",
      "name": "Ganda",
      "native": "Luganda"
    },
    {
      "code": "li",
      "name": "Limburgian",
      "native": "Limburgs"
    },
    {
      "code": "ln",
      "name": "Lingala",
      "native": "Lingála"
    },
    {
      "code": "lo",
      "name": "Laotian",
      "native": "ລາວ / Pha xa lao"
    },
    {
      "code": "lt",
      "name": "Lithuanian",
      "native": "Lietuvių"
    },
    {
      "code": "lu",
      "name": "Luba-Katanga",
      "native": "Tshiluba"
    },
    {
      "code": "lv",
      "name": "Latvian",
      "native": "Latviešu"
    },
    {
      "code": "mg",
      "name": "Malagasy",
      "native": "Malagasy"
    },
    {
      "code": "mh",
      "name": "Marshallese",
      "native": "Kajin Majel / Ebon"
    },
    {
      "code": "mi",
      "name": "Maori",
      "native": "Māori"
    },
    {
      "code": "mk",
      "name": "Macedonian",
      "native": "Македонски"
    },
    {
      "code": "ml",
      "name": "Malayalam",
      "native": "മലയാളം"
    },
    {
      "code": "mn",
      "name": "Mongolian",
      "native": "Монгол"
    },
    {
      "code": "mo",
      "name": "Moldovan",
      "native": "Moldovenească"
    },
    {
      "code": "mr",
      "name": "Marathi",
      "native": "मराठी"
    },
    {
      "code": "ms",
      "name": "Malay",
      "native": "Bahasa Melayu"
    },
    {
      "code": "mt",
      "name": "Maltese",
      "native": "bil-Malti"
    },
    {
      "code": "my",
      "name": "Burmese",
      "native": "မြန်မာစာ"
    },
    {
      "code": "na",
      "name": "Nauruan",
      "native": "Dorerin Naoero"
    },
    {
      "code": "nb",
      "name": "Norwegian Bokmål",
      "native": "Norsk bokmål"
    },
    {
      "code": "nd",
      "name": "North Ndebele",
      "native": "Sindebele"
    },
    {
      "code": "ne",
      "name": "Nepali",
      "native": "नेपाली"
    },
    {
      "code": "ng",
      "name": "Ndonga",
      "native": "Oshiwambo"
    },
    {
      "code": "nl",
      "name": "Dutch",
      "native": "Nederlands"
    },
    {
      "code": "nn",
      "name": "Norwegian Nynorsk",
      "native": "Norsk nynorsk"
    },
    {
      "code": "no",
      "name": "Norwegian",
      "native": "Norsk"
    },
    {
      "code": "nr",
      "name": "South Ndebele",
      "native": "isiNdebele"
    },
    {
      "code": "nv",
      "name": "Navajo",
      "native": "Diné bizaad"
    },
    {
      "code": "ny",
      "name": "Chichewa",
      "native": "Chi-Chewa"
    },
    {
      "code": "oc",
      "name": "Occitan",
      "native": "Occitan"
    },
    {
      "code": "oj",
      "name": "Ojibwa",
      "native": "ᐊᓂᔑᓈᐯᒧᐎᓐ / Anishinaabemowin"
    },
    {
      "code": "om",
      "name": "Oromo",
      "native": "Oromoo"
    },
    {
      "code": "or",
      "name": "Oriya",
      "native": "ଓଡ଼ିଆ"
    },
    {
      "code": "os",
      "name": "Ossetian / Ossetic",
      "native": "Иронау"
    },
    {
      "code": "pa",
      "name": "Panjabi / Punjabi",
      "native": "ਪੰਜਾਬੀ / पंजाबी / پنجابي"
    },
    {
      "code": "pi",
      "name": "Pali",
      "native": "Pāli / पाऴि"
    },
    {
      "code": "pl",
      "name": "Polish",
      "native": "Polski"
    },
    {
      "code": "ps",
      "name": "Pashto",
      "native": "پښتو",
      "rtl": 1
    },
    {
      "code": "pt",
      "name": "Portuguese",
      "native": "Português"
    },
    {
      "code": "qu",
      "name": "Quechua",
      "native": "Runa Simi"
    },
    {
      "code": "rm",
      "name": "Raeto Romance",
      "native": "Rumantsch"
    },
    {
      "code": "rn",
      "name": "Kirundi",
      "native": "Kirundi"
    },
    {
      "code": "ro",
      "name": "Romanian",
      "native": "Română"
    },
    {
      "code": "ru",
      "name": "Russian",
      "native": "Русский"
    },
    {
      "code": "rw",
      "name": "Rwandi",
      "native": "Kinyarwandi"
    },
    {
      "code": "sa",
      "name": "Sanskrit",
      "native": "संस्कृतम्"
    },
    {
      "code": "sc",
      "name": "Sardinian",
      "native": "Sardu"
    },
    {
      "code": "sd",
      "name": "Sindhi",
      "native": "सिनधि"
    },
    {
      "code": "se",
      "name": "Northern Sami",
      "native": "Sámegiella"
    },
    {
      "code": "sg",
      "name": "Sango",
      "native": "Sängö"
    },
    {
      "code": "sh",
      "name": "Serbo-Croatian",
      "native": "Srpskohrvatski / Српскохрватски"
    },
    {
      "code": "si",
      "name": "Sinhalese",
      "native": "සිංහල"
    },
    {
      "code": "sk",
      "name": "Slovak",
      "native": "Slovenčina"
    },
    {
      "code": "sl",
      "name": "Slovenian",
      "native": "Slovenščina"
    },
    {
      "code": "sm",
      "name": "Samoan",
      "native": "Gagana Samoa"
    },
    {
      "code": "sn",
      "name": "Shona",
      "native": "chiShona"
    },
    {
      "code": "so",
      "name": "Somalia",
      "native": "Soomaaliga"
    },
    {
      "code": "sq",
      "name": "Albanian",
      "native": "Shqip"
    },
    {
      "code": "sr",
      "name": "Serbian",
      "native": "Српски"
    },
    {
      "code": "ss",
      "name": "Swati",
      "native": "SiSwati"
    },
    {
      "code": "st",
      "name": "Southern Sotho",
      "native": "Sesotho"
    },
    {
      "code": "su",
      "name": "Sundanese",
      "native": "Basa Sunda"
    },
    {
      "code": "sv",
      "name": "Swedish",
      "native": "Svenska"
    },
    {
      "code": "sw",
      "name": "Swahili",
      "native": "Kiswahili"
    },
    {
      "code": "ta",
      "name": "Tamil",
      "native": "தமிழ்"
    },
    {
      "code": "te",
      "name": "Telugu",
      "native": "తెలుగు"
    },
    {
      "code": "tg",
      "name": "Tajik",
      "native": "Тоҷикӣ"
    },
    {
      "code": "th",
      "name": "Thai",
      "native": "ไทย / Phasa Thai"
    },
    {
      "code": "ti",
      "name": "Tigrinya",
      "native": "ትግርኛ"
    },
    {
      "code": "tk",
      "name": "Turkmen",
      "native": "Туркмен / تركمن"
    },
    {
      "code": "tl",
      "name": "Tagalog / Filipino",
      "native": "Tagalog"
    },
    {
      "code": "tn",
      "name": "Tswana",
      "native": "Setswana"
    },
    {
      "code": "to",
      "name": "Tonga",
      "native": "Lea Faka-Tonga"
    },
    {
      "code": "tr",
      "name": "Turkish",
      "native": "Türkçe"
    },
    {
      "code": "ts",
      "name": "Tsonga",
      "native": "Xitsonga"
    },
    {
      "code": "tt",
      "name": "Tatar",
      "native": "Tatarça"
    },
    {
      "code": "tw",
      "name": "Twi",
      "native": "Twi"
    },
    {
      "code": "ty",
      "name": "Tahitian",
      "native": "Reo Mā`ohi"
    },
    {
      "code": "ug",
      "name": "Uyghur",
      "native": "Uyƣurqə / ئۇيغۇرچە"
    },
    {
      "code": "uk",
      "name": "Ukrainian",
      "native": "Українська"
    },
    {
      "code": "ur",
      "name": "Urdu",
      "native": "اردو",
      "rtl": 1
    },
    {
      "code": "uz",
      "name": "Uzbek",
      "native": "Ўзбек"
    },
    {
      "code": "ve",
      "name": "Venda",
      "native": "Tshivenḓa"
    },
    {
      "code": "vi",
      "name": "Vietnamese",
      "native": "Tiếng Việt"
    },
    {
      "code": "vo",
      "name": "Volapük",
      "native": "Volapük"
    },
    {
      "code": "wa",
      "name": "Walloon",
      "native": "Walon"
    },
    {
      "code": "wo",
      "name": "Wolof",
      "native": "Wollof"
    },
    {
      "code": "xh",
      "name": "Xhosa",
      "native": "isiXhosa"
    },
    {
      "code": "yi",
      "name": "Yiddish",
      "native": "ייִדיש",
      "rtl": 1
    },
    {
      "code": "yo",
      "name": "Yoruba",
      "native": "Yorùbá"
    },
    {
      "code": "za",
      "name": "Zhuang",
      "native": "Cuengh / Tôô / 壮语"
    },
    {
      "code": "zh",
      "name": "Chinese",
      "native": "中文"
    },
    {
      "code": "zu",
      "name": "Zulu",
      "native": "isiZulu"
    }
  ];
	codeNames: any;
	codeData: any;

  constructor( public userService : UserserviceService, private cookieService : CookieService,
              private toastrService : ToastrService, private router : Router,
              private globals : GlobalsService) { 
    this.languageError = '';
    this.timeZoneError = '';
  }

  ngOnInit(): void {
    this.roaster_id = this.cookieService.get("roaster_id");
    this.user_id = this.cookieService.get('user_id');
	this.getUserValue();
	this.getUserConverse();
	// this.getUserLanguage();
	this.language();
  }
  language(){
	this.appLanguage = this.globals.languageJson;
   	this.langActive++;
  }
  onKeyPress(event: any) {
    if (event.target.value == "") {
      document.getElementById(event.target.id).style.border = "1px solid #D50000";
    } else {
      document.getElementById(event.target.id).style.border = "1px solid #d6d6d6";
    }
  }

  
 getUserValue(){
  this.userService.getRoasterProfile(this.roaster_id).subscribe(
    response => {
      console.log(response)
      setTimeout(()=>{
      this.firstName = response['result']['firstname'] ;
      this.lastName  = response['result']['lastname'];
      this.email = response['result']['email'] ;
      this.lang = response['result']['language'] ;
      this.timezone = response['result']['timezone'] ;
      this.phone = response['result']['phone'];
      this.dateOfBirth = response['result']['date_of_birth'];
         this.gender = response['result']['gender'];
         this.address1 = response['result']['address1'];
         this.address2 = response['result']['address2'];
         this.state = response['result']['state'];
         this.country = response['result']['country'];
         this.city = response['result']['city'];
      },500)
    //   this.langActive++;
    }
  );
}
getUserConverse(){
	this.userService.getConverseLanguage().subscribe(response=>{
		console.log(response);
		this.languages = response['result']['languages'];
		// console.log("Before API:"+this.langChips);
		for (var i = 0; i < this.languages.length; i++) {
		this.langName = this.languageCodeArray.find(lang => lang.code == this.languages[i]).name;
		this.codeData = this.languageCodeArray.find(lang => lang.code == this.languages[i]).code;
		this.langChips.push(this.langName);
		this.languageCode.push(this.codeData);
		}
		// console.log("API:"+this.langChips);
	})
}

// getUserLanguage(){
//   this.userService.getLanguageSetting(this.roaster_id).subscribe(
//     result => {
//       console.log(result);
//       this.lang = result['result']['language'] ;
//       this.timezone = result['result']['timezone'] ;
//     }
//   )
// }


  addLang(value:any,code:any) {
    // const input = event.input;
    // const value = event.value;
	// console.log("lang:"+value,"code:"+code);
    if ((value || '').trim()) {
	  this.langChips.push(value.trim());
	  this.languageCode.push(code);
	}
  console.log(this.langChips);
  console.log(this.languageCode);
  
    // // Reset the input values
    // if (input) {
    //   input.value = '';
    // }

  }

  remove(lang: string): void {
    const index = this.langChips.indexOf(lang);
    if (index >= 0) {
      this.langChips.splice(index, 1);
      this.languageCode.splice(index, 1);
    }
    // console.log("remaining:"+this.langChips,this.languageCode);
  }

  showModalDialog() {
    this.displayModal = true;
}

  saveLanguage(){
    if (this.lang == "" || this.lang == null || this.lang == undefined) {
      this.languageError = "Please Select your Language";
      document.getElementById('lang').style.border = "1px solid #D50000";
      setTimeout(() => {
        this.languageError = "";
      }, 4000);
    }
    else if (this.timezone == "" || this.timezone == null || this.timezone == undefined) {
      this.timeZoneError = "Please Select your Timezone";
      document.getElementById('timezone').style.border = "1px solid #D50000";
      setTimeout(() => {
        this.timeZoneError = "";
      }, 4000);
    }
    else{
      var data = {
        'firstname' : this.firstName,
        'lastname' : this.lastName,
        'language' : this.lang,
        'timezone' : this.timezone,
        'phone' : this.phone,
        'gender' : this.gender,
        'date_of_birth' : this.dateOfBirth,
        "address1": this.address1,
        "address2": this.address2,
        "city": this.city,
        "state": this.state,
        "country": this.country
      };
      this.userService.updateRoasterProfile( this.roaster_id,data).subscribe(
        response => {
          console.log(response);
          if(response['success'] == true){
          var dataLang = {
          	'languages' : this.languageCode,
          }
			  this.userService.addConverseLanguage(dataLang).subscribe(result=>{
				if(result['success'] == true){
					this.toastrService.success("Added converse languages successfully.");
				}
				else{
					this.toastrService.error("Error while adding converse languages")
				}
			  })
            this.toastrService.success("The Language and timezone is updated succesfully.");
            // this.router.navigate(['/features/account-settings']);
			this.getUserValue();
			// this.getUserConverse();
            this.showModalDialog();
          }
          else{
            this.toastrService.error("Something went wrong!, Please try again!")
          }
        }
      )
	}
  }

   // Function Name : Logout
  //Description: This function helps to logout the user from the session.

  userLogout() {
    this.userService.logOut().subscribe(
      res => {
        if (res['success'] == true) {
          this.cookieService.deleteAll();
          this.router.navigate(['/login']);

          console.log("Logout successfully !");
          this.toastrService.success("Logout successfully !");
        }
        else {
          console.log("Error while Logout!");
          this.toastrService.error("Error while Logout!");
        }
      }
    )
  }

}
