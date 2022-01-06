const statesList = [
  {
    state_code: 'AN',
    state_name: 'Andaman and Nicobar Islands',
    url:
      'https://res.cloudinary.com/dbphffmis/image/upload/v1639366798/a_n_islands_q7asnw.png',
  },
  {
    state_code: 'AP',
    state_name: 'Andhra Pradesh',
    url:
      'https://res.cloudinary.com/dbphffmis/image/upload/v1639366255/Ap_upv6j0.png',
  },
  {
    state_code: 'AR',
    state_name: 'Arunachal Pradesh',
    url:
      'https://res.cloudinary.com/dbphffmis/image/upload/v1639365748/ARP_tdxyj8.png',
  },
  {
    state_code: 'AS',
    state_name: 'Assam',
    url:
      'https://res.cloudinary.com/dbphffmis/image/upload/v1639365747/assam_ajtsqc.png',
  },
  {
    state_code: 'BR',
    state_name: 'Bihar',
    url:
      'https://res.cloudinary.com/dbphffmis/image/upload/v1639364919/bihar_pr7iz3.png',
  },
  {
    state_code: 'CH',
    state_name: 'Chandigarh',
    url:
      'https://res.cloudinary.com/dbphffmis/image/upload/v1639366798/chandigarh_r3xx9t.png',
  },
  {
    state_code: 'CT',
    state_name: 'Chhattisgarh',
    url:
      'https://res.cloudinary.com/dbphffmis/image/upload/v1639366255/chatisgarh_wngqh5.png',
  },
  {
    state_code: 'DN',
    state_name: 'Dadra and Nagar Haveli and Daman and Diu',
    url:
      'https://res.cloudinary.com/dbphffmis/image/upload/v1639366798/dd_jdfvp9.png',
  },
  {
    state_code: 'DL',
    state_name: 'Delhi',
    url:
      'https://res.cloudinary.com/dbphffmis/image/upload/v1639366797/delhi_fxcddy.png',
  },
  {
    state_code: 'GA',
    state_name: 'Goa',
    url:
      'https://res.cloudinary.com/dbphffmis/image/upload/v1639365747/goa_lvxgrh.png',
  },
  {
    state_code: 'GJ',
    state_name: 'Gujarat',
    url:
      'https://res.cloudinary.com/dbphffmis/image/upload/v1639364919/gujarat_pte2ji.png',
  },
  {
    state_code: 'HR',
    state_name: 'Haryana',
    url:
      'https://res.cloudinary.com/dbphffmis/image/upload/v1639364920/haryana_szdsnh.png',
  },
  {
    state_code: 'HP',
    state_name: 'Himachal Pradesh',
    url:
      'https://res.cloudinary.com/dbphffmis/image/upload/v1639364920/himachal_tfhlhf.png',
  },
  {
    state_code: 'JK',
    state_name: 'Jammu and Kashmir',
    url:
      'https://res.cloudinary.com/dbphffmis/image/upload/v1639364920/jk_zwo6fy.png',
  },
  {
    state_code: 'JH',
    state_name: 'Jharkhand',
    url:
      'https://res.cloudinary.com/dbphffmis/image/upload/v1639365748/jharkand_sqccd8.png',
  },
  {
    state_code: 'KA',
    state_name: 'Karnataka',
    url:
      'https://res.cloudinary.com/dbphffmis/image/upload/v1639366255/karnataka_yxixch.png',
  },
  {
    state_code: 'KL',
    state_name: 'Kerala',
    url:
      'https://res.cloudinary.com/dbphffmis/image/upload/v1639366255/kerala_joxi9m.png',
  },
  {
    state_code: 'LA',
    state_name: 'Ladakh',
    url:
      'https://res.cloudinary.com/dbphffmis/image/upload/v1639366797/ladakh_mqufem.png',
  },
  {
    state_code: 'LD',
    state_name: 'Lakshadweep',
    url:
      'https://res.cloudinary.com/dbphffmis/image/upload/v1639366798/lakshadweep_kg9mgm.png',
  },
  {
    state_code: 'MH',
    state_name: 'Maharashtra',
    url:
      'https://res.cloudinary.com/dbphffmis/image/upload/v1639366255/maha_yjsylf.png',
  },
  {
    state_code: 'MP',
    state_name: 'Madhya Pradesh',
    url:
      'https://res.cloudinary.com/dbphffmis/image/upload/v1639364919/mp_ftqqgr.png',
  },
  {
    state_code: 'MN',
    state_name: 'Manipur',
    url:
      'https://res.cloudinary.com/dbphffmis/image/upload/v1639365747/manipur_z7juyg.png',
  },
  {
    state_code: 'ML',
    state_name: 'Meghalaya',
    url:
      'https://res.cloudinary.com/dbphffmis/image/upload/v1639365747/meghalaya_eigo7k.png',
  },
  {
    state_code: 'MZ',
    state_name: 'Mizoram',
    url:
      'https://res.cloudinary.com/dbphffmis/image/upload/v1639365747/mizoram_ntlj1q.png',
  },
  {
    state_code: 'NL',
    state_name: 'Nagaland',
    url:
      'https://res.cloudinary.com/dbphffmis/image/upload/v1639365747/nagaland_f1btl4.png',
  },
  {
    state_code: 'OR',
    state_name: 'Odisha',
    url:
      'https://res.cloudinary.com/dbphffmis/image/upload/v1639366255/odisha_aoizy9.png',
  },
  {
    state_code: 'PY',
    state_name: 'Puducherry',
    url:
      'https://res.cloudinary.com/dbphffmis/image/upload/v1639366798/puduchery_efpiv8.png',
  },
  {
    state_code: 'PB',
    state_name: 'Punjab',
    url:
      'https://res.cloudinary.com/dbphffmis/image/upload/v1639364920/punjab_wzbixf.png',
  },
  {
    state_code: 'RJ',
    state_name: 'Rajasthan',
    url:
      'https://res.cloudinary.com/dbphffmis/image/upload/v1639364919/rajasthan_sb3vkq.png',
  },
  {
    state_code: 'SK',
    state_name: 'Sikkim',
    url:
      'https://res.cloudinary.com/dbphffmis/image/upload/v1639365748/sikkim_mj7j5a.png',
  },
  {
    state_code: 'TN',
    state_name: 'Tamil Nadu',
    url:
      'https://res.cloudinary.com/dbphffmis/image/upload/v1639366255/tamil_kcjndh.png',
  },
  {
    state_code: 'TG',
    state_name: 'Telangana',
    url:
      'https://res.cloudinary.com/dbphffmis/image/upload/v1639366255/ts_o3llni.png',
  },
  {
    state_code: 'TR',
    state_name: 'Tripura',
    url:
      'https://res.cloudinary.com/dbphffmis/image/upload/v1639366255/tripura_qi2a7j.png',
  },
  {
    state_code: 'UP',
    state_name: 'Uttar Pradesh',
    url:
      'https://res.cloudinary.com/dbphffmis/image/upload/v1639364919/up_gecp82.png',
  },
  {
    state_code: 'UT',
    state_name: 'Uttarakhand',
    url:
      'https://res.cloudinary.com/dbphffmis/image/upload/v1639364919/utarakand_rbyie2.png',
  },
  {
    state_code: 'WB',
    state_name: 'West Bengal',
    url:
      'https://res.cloudinary.com/dbphffmis/image/upload/v1639365748/west_bengal_uwwmsw.png',
  },
]

export default statesList
