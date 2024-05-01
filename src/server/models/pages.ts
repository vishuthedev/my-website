import mongoose, { Schema, Document, Model } from "mongoose";

interface ISubSection extends Document {
  name?: string;
  title?: string;
  subTitle?: string;
  description?: string;
  shortDescription?: string;
  subSectionsImages?: string[];
  type?: string;
  cta?: string;
}

interface ISection extends Document {
  name?: string;
  title?: string;
  subTitle?: string;
  description?: string;
  shortDescription?: string;
  sectionsImages?: string[];
  type?: string;
  cta?: string;
  subSections?: ISubSection[];
}

interface IPage extends Document {
  pageName?: string;
  pageSlug?: string;
  metaDetails?: {
    title?: string;
    description?: string;
    keywords?: string[];
    ogImage?: string;
    favicon?: string;
  };
  sections?: ISection[];
}

const SubSectionSchema: Schema = new Schema({
  name: { type: String, required: false },
  title: { type: String, required: false },
  subTitle: { type: String, required: false },
  description: { type: String, required: false },
  shortDescription: { type: String, required: false },
  subSectionsImages: [{ type: String, required: false }],
  type: { type: String, required: false },
  cta: { type: String, required: false },
});

const SectionSchema: Schema = new Schema({
  name: { type: String, required: false },
  title: { type: String, required: false },
  subTitle: { type: String, required: false },
  description: { type: String, required: false },
  shortDescription: { type: String, required: false },
  sectionsImages: [{ type: String, required: false }],
  type: { type: String, required: false },
  cta: { type: String, required: false },
  subSections: [SubSectionSchema],
});

const PageSchema: Schema = new Schema({
  pageName: { type: String, required: false },
  pageSlug: { type: String, required: false },
  metaDetails: {
    title: { type: String, required: false },
    description: { type: String, required: false },
    keywords: [{ type: String, required: false }],
    ogImage: { type: String, required: false },
    favicon: { type: String, required: false },
  },
  sections: [SectionSchema],
}, { timestamps: true });

let Page: Model<IPage>;

try {
  // Try to retrieve the model if it exists
  Page = mongoose.model<IPage>("Page");
} catch {
  // If it doesn't exist, create and compile the model
  Page = mongoose.model<IPage>("Page", PageSchema);
}

export default Page;
