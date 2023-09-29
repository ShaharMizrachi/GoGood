import {ParamListBase} from '@react-navigation/native';
import React from 'react';
import Post from './ui/Post';

export interface IEnumProfessions {
  id: number;
  category: string;
  he: string;
  icon: string;
  choosed?: boolean;
}

export interface NevigationDestinations {
  name: string;
  component: ParamListBase | string | undefined;
}

export type RootStackParamList = {
  Login: undefined;
  OTP: undefined;
  FirstTime: undefined;
  AreasOfInterest: undefined;
  PicPicker: undefined;
  SelfiPicAsk: undefined;
  Gallery: {amountOfPics: number};
  TabNavigatorGivingHelp: undefined;
  TabNavigatorGettingHelp: undefined;
  PrimaryTopBarNevigation: undefined;
  MapPrimary: {
    posts:
      | GetAvailablePostByprofessionalInter[]
      | GettingHelp_requsts[]
      | PostSend[];
  };
  NewPost: undefined | {post: GettingHelp_requsts};
  PostDetailes: {post: GetAvailablePostByprofessionalInter};
  ManualLocation: undefined;
  MenuPage: undefined;
  EditUser: undefined;
  StatisticsUser: undefined;
  Profile: undefined;
  Reviews: undefined | {[key: string]: any};
  Archive: undefined;
  AboutUs: undefined;
  Settings: undefined;
  ContactUs: undefined;
  ReturningUserScreen: undefined;
  ProfileDetail:
    | undefined
    | {getingHelpDetailes: UserGoGood}
    | {[key: string]: any};
  AddNewRecommendation: undefined | {[key: string]: any};
  ProfileOfOtherUser: undefined | ProfileOfOtherUserIN | {[key: string]: any};
};

export interface tabNavigationComponents {
  name: string;
  component: string;
}

export interface twoPointsDistanceInter {
  lat1: number;
  lat2: number;
  lon1: number;
  lon2: number;
}

export interface GetAvailablePostByprofessionalInter {
  categoryId: number;
  dateUpdete: Date;
  gettingHelpId: number;
  id?: number;
  latitude: number;
  longitude: number;
  problemDescription: string;
  problemPic: string;
  problemTitle: string;
  statusTypeId: number;
  postId?: number;
  recommendtion?: string;
  updatedTimestamp?: string;
}

export interface GettingHelp_requsts {
  id?: number;
  professionalId: number;
  idGivingHelpOwnerPost: number;
  postId: number;
  categoryId: number;
  gettingHelpId: number;
  problemTitle: string;
  problemDescription: string;
  problemPic: string;
  statusTypeId: number;
  dateUpdete: Date;
  latitude: number;
  longitude: number;
  updatedTimestamp?: string;

}
export interface IVolunteer {
  name: string;
  id: string;
  imgUrl: string;
  phone: string;
}
export interface PostSend {
  id?: number;
  categoryId: number;
  gettingHelpId: number;
  dateUpdete: string;
  latitude: number;
  longitude: number;
  problemDescription: string;
  problemPic?: string; //need to delete it and drop the col from the sql, bc we not gonna save the pic in sql anymore  shahar to do
  problemTitle: string;
  statusTypeId: number;
  updatedTimestamp?: string;

}

export interface user_pulled_fromDB {
  fullName: string;
  id: number;
  imei: string;
  imgUrl: string;
  userDescription?: string;
  phone: string;
  type: string;
  categoryArray: number[];
  lat: number;
  long: number;
  token: string;
  FcmToken: string;
}

export interface GettingHelp_requsts {
  professionalId: number;
  postId: number;
  categoryId: number;
  gettingHelpId: number;
  problemTitle: string;
  problemDescription: string;
  problemPic: string;
  statusTypeId: number;
  dateUpdete: Date;
  latitude: number;
  longitude: number;
  updatedTimestamp?: string;

}

export interface categoryInter {
  category: string;
  he: string;
  icon: string;
  id: number;
  choosed?: boolean;
}

export interface newRequstedPost {
  category: string;
  categoryId: number;
  titlePost: string;
  postBody: string;
  imgUri: string;
}

export interface UserGoGood {
  id: number;
  fullName: string;
  phone: string;
  imgUrl: string;
  imei: string;
  userDescription?: string;
  userType: string;
  givingHelpOwnerPosts: any[];
  givingHelpPerProfessions: any[];
  posts: any[];
  FcmToken?: string;
}

export interface userWithToken {
  userGoGood: UserGoGood;
  token: string;
}

export interface autoCpmpleteGooGle {
  description: string;
  place_id: string;
  reference: string;
  structured_formatting: StructuredFormatting | null;
}
export interface StructuredFormatting {
  main_text: string;
  secondary_text: string;
}

export interface Ifeedback {
  review: string;
  rate: number;
  GivingHelpOwnerPostId?: number;
}

export interface User {
  fullName: string;
  phone: string;
  imgUrl: string;
  userType: string;
  userDescription?: string;
}

export interface GotItRecommendation {
  id: number;
  nameGaveRec: string;
  phoneGaveRec: string;
  postId: number;
  rate: number;
  review: string;
  reviewDate: string;
  userTypeGaveRec: string;
  whoGaveItId: number;
  whoGotItId: number;
}

export interface Recommendtion {
  id?: number;
  postId: number;
  review: string;
  rate: number;
  whoGaveItId: number;
  whoGotItId: number;
  reviewDate: Date;
  nameGaveRec?: string;
  phoneGaveRec?: string;
  userTypeGaveRec?: string;
}

export interface ProfileOfOtherUserIN {
  userId: number;
  profilePic: string;
  AvgRate: number;
  fullName: string;
  userDescription?: string;
}
