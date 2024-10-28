"use server";

import User from "@/database/user.model";
import { connectToDatabase } from "../mongoose";
import {
  GetTopInteractedTagsParams,
  GetAllTagsParams,
  GetQuestionsByTagIdParams,
} from "./shared.types";
import Tag from "@/database/tag.model";
import Question from "@/database/question.model";
import { FilterQuery } from "mongoose";
import Interaction from "@/database/interaction.model";

export async function getTopPopularTags() {
  try {
    connectToDatabase();

    const popularTags = await Tag.aggregate([
      { $project: { name: 1, numberOfQuestions: { $size: "$questions" } } },
      { $sort: { numberOfQuestions: -1 } },
      { $limit: 5 },
    ]);

    return popularTags;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getTopInteractedTags(params: GetTopInteractedTagsParams) {
  try {
    // Step 1: Connect to the database
    connectToDatabase();

    // Step 2: Extract the userId from params
    const { userId } = params;

    // Step 3: Find the user by their ID
    const user = await User.findById(userId);

    if (!user) {
      throw new Error("User not found");
    }

    // Step 4: Fetch all interactions for this user and populate tags
    const userInteractions = await Interaction.find({ user: user._id })
      .populate("tags") // Bring full tag objects
      .exec();

    // Step 5: Create an empty array to hold all tags
    const userTags: any[] = [];

    // Step 6: Loop through the interactions and collect all tags
    userInteractions.forEach((interaction) => {
      if (interaction.tags) {
        userTags.push(...interaction.tags); // Spread the tags and add them to userTags array
      }
    });

    // Step 7: Create an object to count the occurrences of each tag (using tag object as key)
    const tagCount: { [key: string]: { tag: any; count: number } } = {};

    userTags.forEach((tag: any) => {
      // If the tag's _id is already in the object, increase its count
      if (tagCount[tag._id]) {
        tagCount[tag._id].count++;
      } else {
        // Otherwise, store the full tag object and set its count to 1
        tagCount[tag._id] = { tag, count: 1 };
      }
    });

    // Step 8: Convert the tagCount object to an array of tag-count pairs
    const tagArray = Object.values(tagCount);

    // Step 9: Sort the tags by count in descending order
    tagArray.sort((a, b) => b.count - a.count);

    // Step 10: Get the top 3 most frequent tags (now containing full tag objects)
    const top3Tags = tagArray.slice(0, 3).map((tagData) => tagData.tag);

    // Return the top 3 full tag objects
    return top3Tags;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getAllTags(params: GetAllTagsParams) {
  try {
    connectToDatabase();

    const { searchQuery, filter, page = 1, pageSize = 5 } = params;
    const skipAmount = (page - 1) * pageSize;

    const query: FilterQuery<typeof Tag> = {};

    if (searchQuery) {
      query.name = { $regex: new RegExp(searchQuery, "i") };
    }

    let sortOptions = {};

    switch (filter) {
      case "popular":
        sortOptions = { questions: -1 };
        break;
      case "recent":
        sortOptions = { createdAt: -1 };
        break;
      case "name":
        sortOptions = { name: 1 };
        break;
      case "old":
        sortOptions = { createdAt: 1 };
        break;

      default:
        break;
    }

    const tags = await Tag.find(query)
      .sort(sortOptions)
      .skip(skipAmount)
      .limit(pageSize);

    const totalTags = await Tag.countDocuments(query);

    const isNext = totalTags > skipAmount + tags.length;

    return { tags, isNext };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getQuestionsByTagId(params: GetQuestionsByTagIdParams) {
  try {
    connectToDatabase();

    const { tagId, page = 1, pageSize = 5, searchQuery } = params;
    const skipAmount = (page - 1) * pageSize;

    const tag = await Tag.findOne({ _id: tagId }).populate({
      path: "questions",
      model: Question,
      match: searchQuery
        ? { title: { $regex: searchQuery, $options: "i" } }
        : {},
      options: {
        sort: { createdAt: -1 },
        skip: skipAmount,
        limit: pageSize,
      },
      populate: [
        { path: "tags", model: Tag, select: "_id name" },
        { path: "author", model: User, select: "_id clerkId name picture" },
      ],
    });

    if (!tag) {
      throw new Error("Tag not found");
    }

    const totalTagQuestions = await Tag.findOne({ _id: tagId }).populate({
      path: "questions",
      match: searchQuery
        ? { title: { $regex: searchQuery, $options: "i" } }
        : {},
    });

    const isNext =
      totalTagQuestions.questions.length > skipAmount + tag.questions.length;

    return { tagTitle: tag.name, questions: tag.questions, isNext };
  } catch (error) {
    console.log(error);
    throw error;
  }
}
