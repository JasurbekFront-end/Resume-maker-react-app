import {
  Document,
  Page,
  Text,
  View,
  Image,
  StyleSheet,
} from "@react-pdf/renderer";
import type { ResumeData } from "./resume-preivew";
import { useEffect, useState } from "react";

const styles = StyleSheet.create({
  page: {
    display: "flex",
    flexDirection: "column",
    padding: 30,
    fontSize: 11,
    backgroundColor: "#ffffff",
    fontFamily: "Helvetica",
    color: "#1a1a1a",
  },
  header: {
    textAlign: "center",
    marginBottom: 24,
  },
  avatar: {
    width: 75,
    height: 75,
    borderRadius: 37.5,
    margin: "0 auto",
    marginBottom: 12,
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#111111",
  },
  jobTitle: {
    fontSize: 13,
    color: "#555555",
    marginTop: 2,
  },
  contact: {
    textAlign: "center",
    marginBottom: 25,
    color: "#444444",
    fontSize: 10,
    lineHeight: 1.4,
  },
  section: {
    marginBottom: 20,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#333333",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  experienceItem: {
    marginBottom: 12,
  },
  role: {
    marginTop: 10,
    fontSize: 12,
    fontWeight: "bold",
    color: "#222222",
  },
  company: {
    marginTop: 5,
    fontSize: 11,
    color: "#666666",
  },
  date: {
    fontSize: 10,
    marginTop: 2,
    fontStyle: "italic",
    color: "#888888",
    marginBottom: 4,
  },
  description: {
    fontSize: 11,
    color: "#333333",
    lineHeight: 1.4,
    marginTop: 7,
  },
  skillItem: {
    fontSize: 10,
    paddingVertical: 4,
    paddingHorizontal: 10,
    backgroundColor: "#f2f2f2",
    color: "#222222",
    margin: 3,
    borderRadius: 4,
  },
  skillContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
});

export default function ResumePDF({ resumeData }: { resumeData: ResumeData }) {
    const [isAcceptableEducation, setIsAcceptableEducation] = useState(false);
  
    useEffect(() => {
      const status = resumeData.educationSections.some(
        (item) =>
          item.school ||
          item.field ||
          item.startDate ||
          item.endDate ||
          item.description ||
          item.isCompleted,
      );
      setIsAcceptableEducation(status);
    }, [resumeData.educationSections]);
    const [isAcceptableExperience, setIsAcceptableExperience] = useState(false);
  
    useEffect(() => {
      const status = resumeData.experienceSection.some(
        (item) =>
          item.company ||
          item.role ||
          item.startDate ||
          item.endDate ||
          item.description ||
          item.isCompleted,
      );
      setIsAcceptableExperience(status);
    }, [resumeData.experienceSection]);
      const [isAcceptableSkills, setIsAcceptableSkills] = useState(false);
  useEffect(() => {
    const status = resumeData.skillSection.some((item) => item !== "");
    setIsAcceptableSkills(status);
  }, [resumeData.skillSection]);
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Image
            src={resumeData.avatar ? resumeData.avatar : ""}
            style={resumeData.avatar ? styles.avatar : { width: 0, height: 0 }}
          />

          <Text style={styles.name}>
            {resumeData.firstName} {resumeData.lastName}
          </Text>
          <Text style={styles.jobTitle}>{resumeData.jobTitle}</Text>
        </View>

        <View style={styles.contact}>
          {resumeData.email && <Text>{resumeData.email}</Text>}
          {resumeData.phone && <Text>{resumeData.phone}</Text>}
          {(resumeData.city || resumeData.country) && (
            <Text>
              {resumeData.city}, {resumeData.country}
            </Text>
          )}
          {resumeData.address && <Text>{resumeData.address}</Text>}
        </View>

        {resumeData.summary && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Summary</Text>
            <Text>{resumeData.summary}</Text>
          </View>
        )}
        {resumeData.educationSections?.length > 0 && isAcceptableEducation && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Education</Text>
            {resumeData.educationSections.map((edu) => (
              <View key={edu.id} style={styles.experienceItem}>
                <Text style={styles.role}>{edu.field}</Text>
                <Text style={styles.company}>{edu.school}</Text>
                <Text style={styles.date}>
                  {edu.startDate} - {edu.isCompleted ? "Ongoing" : edu.endDate}
                </Text>
                <Text style={styles.description}>{edu.description}</Text>
              </View>
            ))}
          </View>
        )}

        {resumeData.experienceSection?.length > 0 && isAcceptableExperience && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Experience</Text>
            {resumeData.experienceSection.map((exp) => (
              <View key={exp.id} style={styles.experienceItem}>
                <Text style={styles.role}>{exp.role}</Text>
                <Text style={styles.company}>{exp.company}</Text>
                <Text style={styles.date}>
                  {exp.startDate} - {exp.isCompleted ? "Ongoing" : exp.endDate}
                </Text>
                <Text style={styles.description}>{exp.description}</Text>
              </View>
            ))}
          </View>
        )}


        {resumeData.skillSection?.length > 0 && isAcceptableSkills && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Skills</Text>
            <View style={styles.skillContainer}>
              {resumeData.skillSection.map((skill, idx) => (
                <Text key={idx} style={styles.skillItem}>
                  {skill}
                </Text>
              ))}
            </View>
          </View>
        )}
      </Page>
    </Document>
  );
}
