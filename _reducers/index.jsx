import { combineReducers } from "redux";

import { authentication } from "./authentication.reducer";
import { alert } from "./alert.reducer";
import { cookies } from "./cookies.reducer";
import { confirm } from "./confirm.reducer";
import crud from "./crud.reducer";
import { connectData } from "./connect.reducer";
import { questionData } from "./question.reducer";
import { breadcrumb } from "./breadcrumb.reducer";
import { currentQuestion } from "./currentQuestion.reducer";
import { editFlow } from "./editFlow.reducer";
import { advancedModule } from "./advancedModule.reducer";
import { loader } from "./loader.reducer";

const rootReducer = combineReducers({
  authentication,
  alert,
  cookies,
  loader,
  confirm,
  breadcrumb,
  connectData,
  questionData,
  currentQuestion,
  editFlow,
  advancedModule,
  contact_types: crud("contact_types"),
  categories: crud("categories"),
  products: crud("products"),
  category: crud("category"),
  modules: crud("modules"),
  module: crud("module"),
  subModules: crud("subModules"),
  subModule: crud("subModule"),
  steps: crud("steps"),
  questions: crud("questions"),
  countries: crud("countries"),
  industries: crud("industries"),
  documents: crud("documents"),
  documentsType: crud("documentsType"),
  pages: crud("page"),
  plans: crud("plans"),
  get_subscription: crud("get_subscription"),
  subscription_history: crud("subscription_history"),
  purchase_history: crud("purchase_history"),
  pages: crud("page"),
  blog: crud("blog"),
  consultants: crud("consultants"),
  consultant: crud("consultant"), //created for detail routing or routing using session
  booking_history: crud("booking_history"),
  booked_consultants: crud("booked_consultants"),
  duration: crud("duration"),
  slots: crud("slots"),
  complaints: crud("complaints"),
  booking_cancel: crud("booking/cancel"),
  schedule_booking: crud("schedule_booking"),
  reviews: crud("reviews"),
  credit_purchase_history: crud("credit_purchase_history"),
  visitor_credit: crud("visitor_credit"),
  credit_purchase: crud("credit_purchase"),
  chat_log: crud("chat-log"),
  time_zone: crud("time-zone"),
  credit_redeem_history: crud("credit_redeem_history"),
  chat_gpt: crud("chat_gpt"),
  donations: crud("donations"),
  community: crud("community"),
  details: crud("communitypost"),
  communitypost: crud("communitypost"),
  details: crud("communitypost"),
  visitorcommunityprofile: crud("visitorcommunityprofile"),
  visitorprofile: crud("visitorprofile"),
  visitor_community: crud("visitor_community"),
  visitor_queries_history: crud("visitor_queries_history"),
  visitor_points_history: crud("visitor_points_history"),
  visitor_profile_levels: crud("visitor_profile_levels"),
});

export default rootReducer;
