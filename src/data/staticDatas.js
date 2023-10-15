import { Dimensions, Platform } from "react-native";
import Constants from 'expo-constants';
export const maxMb = 2;
export const fullWidth = Dimensions.get('window').width;
export const fullHeight = Dimensions.get('window').height;
export const navBarHeight = Platform.OS == 'ios' ? 100 : 60;
export const statusBarHeight = Constants.statusBarHeight;
const visibleScreenHeight = fullHeight - statusBarHeight;
const virtualNavigationBarHeight = fullHeight - visibleScreenHeight;
export const headerHeight = 80;
export const useableScreenSize = fullHeight - navBarHeight - headerHeight - statusBarHeight;
export const themeDark = "#EEEEEE";
export const themeGrey = "#61677A";
export const themeRed = "#E93535";
export const themeGreen = "#21C258";
export const imageName = "coordgraph_images"
export const slogan = "Capture the World, One Point at a Time"

export const fakeUser = {
    userName: "oztasyasinn",
    photoUrl: "https://pbs.twimg.com/profile_images/1701389346866126848/0FfPC9wg_400x400.jpg",
    postCount: 7,
    age: 26,
    location: "Mersin"
}

export const fakePosts = [
    {
        "id": 0,
        "url": "https://images.unsplash.com/photo-1535916707207-35f97e715e1c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8dmlld3xlbnwwfDB8MHx8fDI%3D&auto=format&fit=crop&w=800&q=60",
        "latitude": 39.903021,
        "longitude": 32.776404,
        "date": "2013-07-24T16:20:38"
    },
    {
        "id": 1,
        "url": "https://images.unsplash.com/photo-1519904981063-b0cf448d479e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHZpZXd8ZW58MHwwfDB8fHwy&auto=format&fit=crop&w=800&q=60",
        "latitude": 36.907764,
        "longitude": 35.348886,
        "date": "2010-09-15T13:11:23"
    },
    {
        "id": 2,
        "url": "https://images.unsplash.com/photo-1500926165259-30ef3079d477?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzR8fHZpZXd8ZW58MHwwfDB8fHwy&auto=format&fit=crop&w=800&q=60",
        "latitude": 40.289609,
        "longitude": 36.624133,
        "date": "2006-11-11T10:25:45"
    },
    {
        "id": 3,
        "url": "https://images.unsplash.com/photo-1508442279723-a01da83be32b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTN8fHZpZXd8ZW58MHwwfDB8fHwy&auto=format&fit=crop&w=800&q=60",
        "latitude": 38.958608,
        "longitude": 34.104823,
        "date": "2010-01-20T17:38:50"
    },
    {
        "id": 4,
        "url": "https://images.unsplash.com/photo-1498153597544-b835ef9d870b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjB8fHZpZxd8ZW58MHwwfDB8fHwy&auto.format&fit=crop&w=800&q=60",
        "latitude": 36.983358,
        "longitude": 30.767321,
        "date": "2008-06-2T15:52:6"
    },
    {
        "id": 5,
        "url": "https://images.unsplash.com/photo-1570135460231-4407ce9488b5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nzl8fHZpZxd8ZW58MHwwfDB8fHwy&auto.format&fit=crop&w=800&q=60",
        "latitude": 39.604101,
        "longitude": 29.272204,
        "date": "2013-04-12T5:31:36"
    },
    {
        "id": 6,
        "url": "https://images.unsplash.com/photo-1584048139622-28fd9506af94?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODV8fHZpZxd8ZW58MHwwfDB8fHwy&auto.format&fit=crop&w=800&q=60",
        "latitude": 41.474117,
        "longitude": 33.845504,
        "date": "2017-09-5T21:43:47"
    },
    {
        "id": 7,
        "url": "https://images.unsplash.com/photo-1540646794357-6cbbd6f3501e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTE5fHx2aWV3fGVufDB8MHwwfHx8Mg%3D%3D&auto.format&fit=crop&w=800&q=60",
        "latitude": 41.077798,
        "longitude": 29.00836,
        "date": "2008-12-7T1:25:41"
    },
    {
        "id": 8,
        "url": "https://images.unsplash.com/photo-1519492735906-95cbce8c4baa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTEyfHx2aWV3fGVufDB8MHwwfHx8Mg%3D%3D&auto.format&fit=crop&w=800&q=60",
        "latitude": 38.615261,
        "longitude": 26.985554,
        "date": "2013-05-23T3:8:35"
    },

    {
        "id": 10,
        "url": "https://images.unsplash.com/photo-1535916707207-35f97e715e1c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8dmlld3xlbnwwfDB8MHx8fDI%3D&auto=format&fit=crop&w=800&q=60",
        "latitude": 39.903021,
        "longitude": 32.776404,
        "date": "2013-07-24T16:20:38"
    },
    {
        "id": 11,
        "url": "https://images.unsplash.com/photo-1519904981063-b0cf448d479e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHZpZXd8ZW58MHwwfDB8fHwy&auto=format&fit=crop&w=800&q=60",
        "latitude": 36.907764,
        "longitude": 35.348886,
        "date": "2010-09-15T13:11:23"
    },
    {
        "id": 12,
        "url": "https://images.unsplash.com/photo-1500926165259-30ef3079d477?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzR8fHZpZXd8ZW58MHwwfDB8fHwy&auto=format&fit=crop&w=800&q=60",
        "latitude": 40.289609,
        "longitude": 36.624133,
        "date": "2006-11-11T10:25:45"
    },
    {
        "id": 13,
        "url": "https://images.unsplash.com/photo-1508442279723-a01da83be32b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTN8fHZpZXd8ZW58MHwwfDB8fHwy&auto=format&fit=crop&w=800&q=60",
        "latitude": 38.958608,
        "longitude": 34.104823,
        "date": "2010-01-20T17:38:50"
    },
    {
        "id": 14,
        "url": "https://images.unsplash.com/photo-1498153597544-b835ef9d870b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjB8fHZpZxd8ZW58MHwwfDB8fHwy&auto.format&fit=crop&w=800&q=60",
        "latitude": 36.983358,
        "longitude": 30.767321,
        "date": "2008-06-2T15:52:6"
    },
    {
        "id": 15,
        "url": "https://images.unsplash.com/photo-1570135460231-4407ce9488b5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nzl8fHZpZxd8ZW58MHwwfDB8fHwy&auto.format&fit=crop&w=800&q=60",
        "latitude": 39.604101,
        "longitude": 29.272204,
        "date": "2013-04-12T5:31:36"
    },
    {
        "id": 16,
        "url": "https://images.unsplash.com/photo-1584048139622-28fd9506af94?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODV8fHZpZxd8ZW58MHwwfDB8fHwy&auto.format&fit=crop&w=800&q=60",
        "latitude": 41.474117,
        "longitude": 33.845504,
        "date": "2017-09-5T21:43:47"
    },
    {
        "id": 17,
        "url": "https://images.unsplash.com/photo-1540646794357-6cbbd6f3501e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTE5fHx2aWV3fGVufDB8MHwwfHx8Mg%3D%3D&auto.format&fit=crop&w=800&q=60",
        "latitude": 41.077798,
        "longitude": 29.00836,
        "date": "2008-12-7T1:25:41"
    },
    {
        "id": 18,
        "url": "https://images.unsplash.com/photo-1519492735906-95cbce8c4baa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTEyfHx2aWV3fGVufDB8MHwwfHx8Mg%3D%3D&auto.format&fit=crop&w=800&q=60",
        "latitude": 38.615261,
        "longitude": 26.985554,
        "date": "2013-05-23T3:8:35"
    }
]
