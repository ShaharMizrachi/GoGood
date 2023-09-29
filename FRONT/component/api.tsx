import React from 'react';
import axios, {AxiosResponse} from 'axios';
import {
  GetAvailablePostByprofessionalInter,
  user_pulled_fromDB,
  PostSend,
  Ifeedback,
} from './Interfaces';
import {IContactForm} from './ContactUs/ContactUsProps';

const GOOGLE_URL = 'https://maps.googleapis.com/maps/api';

const url = axios.create({
  baseURL: 'http://ec2-52-211-34-164.eu-west-1.compute.amazonaws.com/api',
  //baseURL: 'http://10.0.2.2:8080/api', //local
  headers: {
    'Content-type': 'Application/json',
    //'Access-Control-Allow-Origin': '*',
  },
});

// {
//     headers: {
//         Authorization: `bearer ${token}`
//     }
// }

//return makeRequest(async () => {},"")
export const makeRequest = async (
  callback: () => Promise<any>,
  functionName: string,
  Msgtype: number,
) => {
  try {
    return await callback();
  } catch (e) {
    // await Logger(functionName, Msgtype, e);
    console.log(`[${functionName}]: ${e}`);
  }
};

export const Logger = async (
  functionName: string,
  Msgtype: number,
  error: any,
) => {
  try {
    await url.post('/Logs', {
      description: `[${functionName}]: ${error}`,
      type: Msgtype,
    });
  } catch (e) {
    console.log(
      `Can not send log from Logger to server of [${functionName}]: ${error}, [Logger]:${e}`,
    );
  }
};

export const RequestOTPNumber = async (number: string) => {
  return makeRequest(
    async () => {
      const data = await url.get(`/OTP/RequestOTPNumber/${number}`);
      console.log({eror: data});
      return data;
    },
    'RequestOTPNumber',
    0,
  );
};

export const CheckOtpValidation = async (number: string, optCode: string) => {
  return makeRequest(
    async () => {
      const data = await url.get(
        `/OTP/CheckOtpValidation?number=${number}&code=${optCode}`,
      );
      return data;
    },
    'CheckOtpValidation',
    0,
  );
};

export const EnumProfessions = async () => {
  return makeRequest(
    async () => {
      const data = await url.get('/EnumProfessions');
      return data;
    },
    'EnumProfessions',
    0,
  );
};

export const uploadPic = async (data: FormData) => {
  return makeRequest(
    async () => {
      const response = await fetch(
        'http://ec2-52-211-34-164.eu-west-1.compute.amazonaws.com/api/Posts/uploadPic',
        //'http://10.0.2.2:8080/api/Posts/uploadPic',
        {
          method: 'POST',
          body: data,
        },
      );
      return await response.json();
    },
    'uploadPic',
    0,
  );
};

export const ifUserWasBeforeInApp = async (imei: string) => {
  return makeRequest(
    async () => {
      const response = await url.get(
        `/UsersGoGood/ifUserWasBeforeInApp/${imei}`,
      );
      return response;
    },
    'ifUserWasBeforeInApp',
    0,
  );
};

export const GetPostPics = async (postId: string) => {
  // that is the one yairrrrrr
  return makeRequest(
    async () => {
      const response = await url.get(`/Posts/GetPostPic/${postId}`);
      return response;
    },
    'GetPostPics',
    0,
  );
};
export const deleteUser = async (userId: string) => {
  return makeRequest(
    async () => {
      const response = await url.delete(`/UsersGoGood/${userId}`);
      return response;
    },
    'deleteUser',
    0,
  );
};

export const GetPostPic = async (postId: string) => {
  console.log({postId});
  return makeRequest(
    async () => {
      const response = await url.get(`/Posts/${postId}`);
      return response;
    },
    'GetPostPic',
    0,
  );
};

export const GetUserProfilePic = async (userId: string) => {
  return makeRequest(
    async () => {
      const response = await url.get(
        `/UsersGoGood/GetUserProfilePic/${userId}`,
      );
      return response;
    },
    'GetUserProfilePic',
    0,
  );
};

export const AvailablePost_ToGivingHelp = async (
  numProfesionalId: number,
  token: string,
) => {
  return makeRequest(
    async () => {
      const response = await url.get(
        `/Posts/AvailablePost_ToGivingHelp/${numProfesionalId}`,
        {
          headers: {
            Authorization: `bearer ${token}`,
          },
        },
      );
      return response;
    },
    'AvailablePost_ToGivingHelp',
    0,
  );
};

export const GetPosts_OwnerBy_GivingHelp = async (
  numProfesionalId: number,
  token: string,
) => {
  return makeRequest(
    async () => {
      const response = await url.get(
        `/Posts/GetPosts_OwnerBy_GivingHelp/${numProfesionalId}`,
        {
          headers: {
            Authorization: `bearer ${token}`,
          },
        },
      );
      return response;
    },
    'GetPosts_OwnerBy_GivingHelp',
    0,
  );
};

export const ConvertLoctionToAddress = async (lat: number, long: number) => {
  return makeRequest(
    async () => {
      const response = await axios.get(
        `${GOOGLE_URL}/geocode/json?latlng=${lat},${long}&language=iw&key=AIzaSyCQXbHLjw74xq_Pm99uLeyP53_QkGGDhbE`,
      );
      return response.data.results[0]?.address_components[2].long_name;
    },
    'ConvertLoctionToAddress',
    0,
  );
};
export const ConvertLocationToAddressObject = async (
  lat: number,
  long: number,
) => {
  return makeRequest(
    async () => {
      const response = await axios.get(
        `${GOOGLE_URL}/geocode/json?latlng=${lat},${long}&language=iw&key=AIzaSyCQXbHLjw74xq_Pm99uLeyP53_QkGGDhbE`,
      );
      // response.data.results[0].formatted_address// full address
      //response.data.results[0].address_components[2].long_name //just the city
      //const response = "ישראל"
      return response.data;
    },
    'ConvertLocationToAddressObject',
    0,
  );
};

export const getUser = async (phoneNumber: string) => {
  return makeRequest(
    async () => {
      const response = await url.get(
        `/UsersGoGood/GetUserPplByNumber/${phoneNumber}`,
      );
      return response.data;
    },
    'getUser',
    0,
  );
};

export const autocompletePlaces = async (term: string) => {
  return makeRequest(
    async () => {
      const data = await axios.post(
        `${GOOGLE_URL}/place/autocomplete/json?key=AIzaSyCQXbHLjw74xq_Pm99uLeyP53_QkGGDhbE&input=${term}&language=iw&components=country:il`,
      );
      return data.data.predictions;
      //data.predictions that the place we need,
      //getting the name in "description"
      // taking the "place_id" from data.predictions.place_id and getting the lat and long
    },
    'autocompletePlaces',
    0,
  );
};

export const GetGeoLocation_byPlaceId = async (placeId: string) => {
  return makeRequest(
    async () => {
      const geoLocation = await axios.post(
        ` ${GOOGLE_URL}/place/details/json?placeid=${placeId}&key=AIzaSyCQXbHLjw74xq_Pm99uLeyP53_QkGGDhbE&language=iw&components=country:il`,
      );
      return geoLocation;
    },
    'GetGeoLocation_byPlaceId',
    0,
  );
};

export const addUser = async (user: user_pulled_fromDB) => {
  let dataUser = {
    fullName: user.fullName,
    phone: user.phone,
    imgUrl: user.imgUrl,
    fcmToken: user.FcmToken,
    imei: user.imei,
    userType: user.type,
    givingHelpPerProfessions: user.categoryArray.map(category => {
      return {categoryId: category};
    }),
  };
  return makeRequest(
    async () => {
      const response = await url.post('/UsersGoGood', dataUser);
      return response.data;
    },
    'addUser',
    0,
  );
};
// yair
export const changingStatusOfPost = async (
  post: GetAvailablePostByprofessionalInter,
  statusNum: number,
  userId: number,
) => {
  return makeRequest(
    async () => {
      console.log(post);
      let data: any = {
        id: post.id,
        categoryId: post.categoryId,
        gettingHelpId: post.gettingHelpId,
        problemTitle: post.problemTitle,
        problemDescription: post.problemDescription,
        problemPic: post.problemPic,
        statusTypeId: statusNum,
        dateUpdete: post.dateUpdete,
        latitude: post.latitude,
        longitude: post.longitude,
        updatedTimestamp: post.updatedTimestamp,
      };

      // if (statusNum === 3) {
      //   data['updatedTimestamp'] = Date.now();
      // }
      // if (statusNum === 5) {
      //   data['updatedTimestamp'] = null;
      // }
      console.log(data);
      const userStatus = await url.put(
        `/Posts/${userId}`,
        {...data},
        {
          headers: {
            'X-Additional-Value': JSON.stringify({changeStatus: true}),
          },
        },
      );
    },
    'changingStatusOfPost',
    0,
  );
};

export const detachedPostToProfessional = async (postId: number) => {
  return makeRequest(
    async () => {
      const detachedPost = await url.delete(
        `/GivingHelpOwnersPosts/DetachingGivingHelpOwnerPostByPostId/${postId}`,
      );
    },
    'detachedPostToProfessional',
    0,
  );
};

export const connectProffesionalToPost = async (
  Idpost: number,
  Iduser: number,
) => {
  return makeRequest(
    async () => {
      const connectPreffesional = await url.post('/GivingHelpOwnersPosts', {
        postId: Idpost,
        givingHelpId: Iduser,
      });
    },
    'connectProffesionalToPost',
    0,
  );
};

export const gettingHelp_statusActiveClose = async (
  GettingHelpId: number,
  token: string,
) => {
  return makeRequest(
    async () => {
      const response = await url.get(
        `/Posts/gettingHelp_statusActiveClose/${GettingHelpId}`,
        {
          headers: {
            Authorization: `bearer ${token}`,
          },
        },
      );
      return response;
    },
    'ettingHelp_statusActiveClose',
    0,
  );
};

export const gettingHelp_statusPending = async (
  GettingHelpId: number,
  token: string,
) => {
  return makeRequest(
    async () => {
      const response = await url.get(
        `/Posts/gettingHelp_statusPending/${GettingHelpId}`,
        {
          headers: {
            Authorization: `bearer ${token}`,
          },
        },
      );
      return response;
    },
    'gettingHelp_statusPending',
    0,
  );
};

// get all post from status 1-3 no including the user that log in (getHelp user)
export const getPostsExcludingUser = async (
  GettingHelpId: number,
  token: string,
) => {
  return makeRequest(
    async () => {
      const response = await url.get(
        `/Posts/getPostsExcludingUser/${GettingHelpId}`,
        {
          headers: {
            Authorization: `bearer ${token}`,
          },
        },
      );
      return response;
    },
    'getPostsExcludingUser',
    0,
  );
};

//Description: get all posts of user from status type 1 to 4
export const getAllUserPostsByStatus = async (
  GettingHelpId: number,
  token: string,
) => {
  return makeRequest(
    async () => {
      const response = await url.get(
        `/Posts/GetAllUserPostsByStatus/${GettingHelpId}`,
        {
          headers: {
            Authorization: `bearer ${token}`,
          },
        },
      );
      return response;
    },
    'getAllUserPostsByStatus',
    0,
  );
};

export const postNewRequest = async (token: string, myPost: PostSend) => {
  return makeRequest(
    async () => {
      const response = await url.post('/Posts', myPost, {
        headers: {
          Authorization: `bearer ${token}`,
        },
      });
      return response;
    },
    'postNewRequest',
    0,
  );
};
// yair
export const editPost = async (EditedPost: PostSend) => {
  console.log({EditedPost});
  return makeRequest(
    async () => {
      const response = await url.put(`/Posts/${EditedPost.id}`, EditedPost);
      console.log(response);
    },
    'editPost',
    0,
  );
};

export const getUserById = async (id: number) => {
  return makeRequest(
    async () => {
      const response = await url.get(`/UsersGoGood/${id}`);
      return response.data;
    },
    'getUserById',
    0,
  );
};

export const getPost = async (id: number) => {
  return makeRequest(
    async () => {
      const response = await url.get(`/posts/${id}`);
      return response.data;
    },
    'getPost',
    0,
  );
};

export const getUsersProfessions = async (id: number) => {
  return makeRequest(
    async () => {
      const usersProfessions = await url.get(
        `/GivingHelpPerProfessions/GivingHelpcategories/${id}`,
      );
      return usersProfessions.data;
    },
    'getUsersProfessions',
    0,
  );
};

export const updateUser = async (user: user_pulled_fromDB, token: string) => {
  return makeRequest(
    async () => {
      const userData = {
        id: user.id,
        fullName: user.fullName,
        phone: user.phone,
        imgUrl: user.imgUrl,
        userType: user.type,
        imei: user.imei,
        userDescription: user.userDescription,
        FcmToken: user.FcmToken,
      };
      const response = await url.put(`/UsersGoGood/${user.id}`, userData, {
        headers: {
          Authorization: `bearer ${token}`,
        },
      });
    },
    'updateUser',
    0,
  );
};

export const phoneExists = async (phoneNumber: string) => {
  return makeRequest(
    async () => {
      const result = await url.get(
        `/usersGogood/BooleanExistUserPplByNumber/${phoneNumber}`,
      );
      return result.data;
    },
    'phoneExists',
    0,
  );
};

export const updateCategories = async (
  id: number,
  categoriesToDelete: string,
  categoriesToAdd: string,
  token: string,
) => {
  const data = {
    toRemoveList: categoriesToDelete,
    toAddList: categoriesToAdd,
  };
  return makeRequest(
    async () => {
      const result = await url.put(
        `/GivingHelpPerProfessions/UpdateCategoriesForGivingHelp/${id}`,
        data,
        {
          headers: {
            Authorization: `bearer ${token}`,
          },
        },
      );
    },
    'updateCategories',
    0,
  );
};

//old one Shahar change it by the new table.
export const sendRecommendation = async (recommendion: Ifeedback) => {
  return makeRequest(
    async () => {
      const data = await url.post('/Recommendations', recommendion);
    },
    'sendRecommendation',
    0,
  );
};

// //return makeRequest(async () => {},"")

//old one Shahar change it by the new table.
// export const getRecommendationsForPost = async (PostId: number) => {
//   return makeRequest(
//     async () => {
//       const data = await url.get(
//         `/Recommendations/getRecommendationsForPost/${PostId}`,
//       );
//       return data.data;
//     },
//     'getRecommendationsForPost',
//     0,
//   );
// };

export const getRecommendationsForPost = async (PostId: number) => {
  return makeRequest(
    async () => {
      const data = await url.get(
        `Recommendations/getAllRecommendationsBypostId/${PostId}`,
      );
      return data.data;
    },
    'getRecommendationsForPost',
    0,
  );
};

//get all recommendation user got by the user id
export const getAllWhoGotItRecommendationsByUserId = async (userId: number) => {
  console.log({userId});
  return makeRequest(
    async () => {
      const data = await url.get(
        `/Recommendations/getAllWhoGotItRecommendationsByUserId/${userId}`,
      );
      return data.data;
    },
    'getAllWhoGotItRecommendationsByUserId',
    0,
  );
};
// shahar not in use anymore, do not delete in case you should activate component StatisticsUser
// export const getAvgRateByGivingHelpId = async (id: number) => {
//   return makeRequest(
//     async () => {
//       const data = await url.get(
//         `/Recommendations/getAvgRateByGivingHelpId/${id}`,
//       );
//       return data.data;
//     },
//     'getAvgRateByGivingHelpId',
//     0,
//   );
// };

export const getUserAvgRateByUserId = async (id: number) => {
  return makeRequest(
    async () => {
      const data = await url.get(
        `/Recommendations/getUserAvgRateByUserId/${id}`,
      );
      return data.data;
    },
    'getUserAvgRateByUserId',
    0,
  );
};

export const getAllPostsOfGivingHelpClosed = async (id: number) => {
  return makeRequest(
    async () => {
      const data = await url.get(`/Posts/GetAllPostsOfGivingHelpClosed/${id}`);
      return data.data;
    },
    'getAllPostsOfGivingHelpClosed',
    0,
  );
};

export const getAllPostsOfGetHelpClosed = async (id: number) => {
  return makeRequest(
    async () => {
      const data = await url.get(`/Posts/GetAllPostsOfGetHelpClosed/${id}`);
      return data.data;
    },
    'getAllPostsOfGetHelpClosed',
    0,
  );
};

export const GetGivingHelpOwnerPostsByPostId = async (postId: number) => {
  return makeRequest(
    async () => {
      const data = await url.get(`/GivingHelpOwnersPosts/ByPostId/${postId}`);
      return data;
    },
    'GetGivingHelpOwnerPostsByPostId',
    0,
  );
};

export const GettingHelpIdAmountOfRequset = async (id: number) => {
  return makeRequest(
    async () => {
      const data = await url.get(`/Posts/gettingHelpIdAmountOfRequset/${id}`);
      return data.data;
    },
    'GettingHelpIdAmountOfRequset',
    0,
  );
};

export const amountOfrequestBelongToPro = async (id: number) => {
  return makeRequest(
    async () => {
      const data = await url.get(`/Posts/amountOfrequestBelongToPro/${id}`);
      return data.data;
    },
    'amountOfrequestBelongToPro',
    0,
  );
};

export const gettingHelpIdAmountOfrequestNumber = async (id: number) => {
  return makeRequest(
    async () => {
      const data = await url.get(
        `/Posts/gettingHelpIdAmountOfrequestNumber/${id}`,
      );
      return data.data;
    },
    'gettingHelpIdAmountOfrequestNumber',
    0,
  );
};

export const givingHelpIdAmountOfrequestNumber = async (id: number) => {
  return makeRequest(
    async () => {
      const data = await url.get(
        `/Posts/givingHelpIdAmountOfrequestNumber/${id}`,
      );
      return data.data;
    },
    'givingHelpIdAmountOfrequestNumber',
    0,
  );
};
export const sendMail = async (form: IContactForm) => {
  const Body = `
    Full Name: ${form.fullName.value}
    Email: ${form.email.value}
    Phone: ${form.phone.value}
    Message: ${form.message.value}
`;
  const reqData = {
    Subject: 'GooGod App',
    Body,
    Recipients: ['yair.g@zigit.co.il'],
  };
  return makeRequest(
    async () => {
      const data = await url.post(`/Mailer/SendMail/`, reqData);
      return data.data;
    },
    'sendMail',
    0,
  );
};
