// مصدر البيانات الموحّد لكل التطبيق. يشترك (subscribe) في كل مجموعات
// Firestore عبر طبقة src/firebase، ويوفر دوال الإضافة/التعديل/الحذف
// للمكوّنات دون أن تعرف تلك المكوّنات شيئًا عن Firebase نفسه.
import { createContext, useContext, useEffect, useState } from "react";
import * as jobsService from "../firebase/jobsService";
import * as categoriesService from "../firebase/categoriesService";
import * as citiesService from "../firebase/citiesService";
import * as organizationsService from "../firebase/organizationsService";
import * as adsService from "../firebase/adsService";
import * as placementsService from "../firebase/placementsService";

const DataContext = createContext(null);

export function useData() {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error("useData must be used within a DataProvider");
  return ctx;
}

export function DataProvider({ children }) {
  const [jobs, setJobs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [cities, setCities] = useState([]);
  const [organizations, setOrganizations] = useState([]);
  const [ads, setAds] = useState([]);
  const [placements, setPlacements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubJobs = jobsService.subscribeToJobs(setJobs);
    const unsubCategories = categoriesService.subscribeToCategories(setCategories);
    const unsubCities = citiesService.subscribeToCities(setCities);
    const unsubOrgs = organizationsService.subscribeToOrganizations(setOrganizations);
    const unsubAds = adsService.subscribeToAds(setAds);
    const unsubPlacements = placementsService.subscribeToPlacements(setPlacements);
    setLoading(false);
    return () => {
      unsubJobs && unsubJobs();
      unsubCategories && unsubCategories();
      unsubCities && unsubCities();
      unsubOrgs && unsubOrgs();
      unsubAds && unsubAds();
      unsubPlacements && unsubPlacements();
    };
  }, []);

  const value = {
    loading,
    jobs,
    categories,
    cities,
    organizations,
    ads,
    placements,
    addJob: jobsService.createJob,
    updateJob: jobsService.updateJob,
    deleteJob: jobsService.deleteJob,
    addCategory: categoriesService.createCategory,
    deleteCategory: categoriesService.deleteCategory,
    addCity: citiesService.createCity,
    deleteCity: citiesService.deleteCity,
    addOrganization: organizationsService.createOrganization,
    updateOrganization: organizationsService.updateOrganization,
    deleteOrganization: organizationsService.deleteOrganization,
    addAd: adsService.createAd,
    updateAd: adsService.updateAd,
    deleteAd: adsService.deleteAd,
    addPlacement: placementsService.createPlacement,
    deletePlacement: placementsService.deletePlacement,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}
