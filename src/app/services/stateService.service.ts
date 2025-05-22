import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StateServiceService {

constructor() { }

  stateList = [
    {
      state: "Johor",
      district:[
        "Batu Pahat",
        "Johor Bahru",
        "Kluang",
        "Kota Tinggi",
        "Kulai",
        "Mersing",
        "Muar",
        "Pontian",
        "Segamat",
        "Tangkak",
        "Iskandar Puteri"
      ]
    },{
      state: "Kedah",
      district:[
        "Alor Setar",
        "Baling",
        "Bandar Baharu",
        "Kota Setar",
        "Kuala Muda",
        "Kubang Pasu",
        "Kulim",
        "Langkawi",
        "Padang Terap",
        "Pendang",
        "Pokok Sena",
        "Sik",
        "Yan",
        "Sungai Petani"
      ]
    },{
      state: "Kelantan",
      district:[
        "Kota Bharu",
        "Pasir Mas",
        "Tumpat",
        "Bachok",
        "Tanah Merah",
        "Pasir Puteh",
        "Kuala Krai",
        "Machang",
        "Gua Musang",
        "Jeli"
      ]
    },{
      state: "Melaka",
      district:[
        "Alor Gajah",
        "Jasin",
        "Melaka Tengah"
      ]
    },{
      state: "Negeri Sembilan",
      district:[
        "Seremban",
        "Port Dickson",
        "Jempol",
        "Tampin",
        "Kuala Pilah",
        "Rembau",
        "Jelebu"
      ]
    },{
      state: "Pahang",
      district:[
        "Bera",
        "Bentong",
        "Cameron Highlands",
        "Jerantut",
        "Kuantan",
        "Lipis",
        "Maran",
        "Pekan",
        "Raub",
        "Rompin",
        "Temerloh"
      ]
    },{
      state: "Pulau Pinang",
      district:[
        "Alma, Bukit Mertajam",
        "Central Seberang Perai",
        "North Seberang Perai",
        "Northeast Penang Island",
        "South Seberan Perai",
        "Southwest Penang Island"
      ]
    },{
      state: "Perak",
      district:[
        "Batang Padang",
        "Manjung",
        "Kinta",
        "Kerian",
        "Kuala Kangsar",
        "Larut, Matang and Selama",
        "Hilir Perak",
        "Hulu Perak",
        "Perak Tengah",
        "Kampar",
        "Muallim",
        "Bagan Datuk"
      ]
    },{
      state: "Perlis",
      district:[
        "Padang Besar",
        "Kangar",
        "Arau"
      ]
    },{
      state: "Sabah",
      district:[
        "Beaufort",
        "Beluran",
        "Kalabakan",
        "Keningau",
        "Kinabatangan",
        "Kota Belud",
        "Kota Kinabalu",
        "Kota Marudu",
        "Kuala Penyu",
        "Kudat",
        "Kunak",
        "Lahad Datu",
        "Membakut",
        "Nabawan",
        "Paitan",
        "Papar",
        "Penampang",
        "Pitas",
        "Putatan",
        "Ranau",
        "Sandakan",
        "Semporna",
        "Sipitang",
        "Sook",
        "Tambunan",
        "Tawau",
        "Telupid",
        "Tenom",
        "Tongod",
        "Tuaran"
      ]
    },{
      state: "Sarawak",
      district:[
        "Kuching",
        "Sri Aman",
        "Sibu",
        "Miri",
        "Limbang",
        "Sarikei",
        "Kapit",
        "Samarahan",
        "Bintulu",
        "Betong",
        "Mukah",
        "Serian"
      ]
    },{
      state: "Selangor",
      district:[
        "Gombak",
        "Hulu Langat",
        "Hulu Selangor",
        "Klang",
        "Kuala Langat",
        "Kuala Selangor",
        "Petaling",
        "Sabak Bernam",
        "Sepang"
      ]
    },{
      state: "Terengganu",
      district:[
        "Besut",
        "Setiu",
        "Hulu Terengganu",
        "Kuala Nerus",
        "Kuala Terengganu",
        "Marang",
        "Dungun",
        "Kemaman"
      ]
    },{
      state: "Kuala Lumpur",
      district:[
        "Bukit Bintang",
        "Titiwangsa",
        "Setiawangsa",
        "Wangsa Maju",
        "Batu",
        "Kepong",
        "Segambut",
        "Lembah Pantai",
        "Seputeh",
        "Bandar Tun Razak",
        "Cheras"
      ]
    },{
      state: "Labuan",
      district:[
       ''
      ]
    },{
      state: "Putrajaya",
      district:[
        ''
      ]
    },
  ]

  getStates(){
    return this.stateList;
  }

  getDistrictsByState(stateName: string) {
    if(stateName === 'Putrajaya' || stateName === 'Labuan'){
      return [];
    }
    
    const stateObj = this.stateList.find(s => s.state === stateName);
    return stateObj ? stateObj.district : [];
  }

  
}
