import { getChapter } from "@/actions/get-chapter";
import { Banner } from "@/components/banner";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import VideoPlayer from "./_components/video-player";
import { CourseEnrollButton } from "./_components/course-enroll-button";
import { Separator } from "@/components/ui/separator";
import { Preview } from "@/components/preview";
import { FileIcon } from "lucide-react";

const ChapterIdPage = async ({
    params
}: {
    params: {
        courseId: string;
        chapterId: string;
    }
}) => {

    const { userId } = auth();
    if(!userId) {
        return redirect("/");
    }

    const {
         course,
         chapter,
         muxData,
         attachments,
         nextChapter,
         userProgress,
         purchase,
    } = await getChapter({
        userId,
        courseId: params.courseId,
        chapterId: params.chapterId,
    });

    if(!course || !chapter) {
        return redirect("/");
    }

    const isLocked = !chapter.isFree && !purchase;
    const completedOnEnd = !!purchase && !userProgress?.isCompleted;

    return (
      <div>
        {userProgress?.isCompleted && (
          <Banner
            label="You have already completed this chapter."
            variant="success"
          />
        )}
        {isLocked && (
          <Banner
            label="You need to purchase this course to view this chapter."
            variant="warning"
          />
        )}
        <div className="flex flex-col max-w-4xl mx-auto pb-20   ">
            <div className="p-4">
                <VideoPlayer
                    chapterID={params.chapterId}
                    title={chapter.title}
                    courseID={params.courseId}
                    nextChapterID={nextChapter?.id}
                    playbackId={muxData?.playbackId!}
                    isLocked={isLocked}
                    completeOnEnd={completedOnEnd}
                />
            </div>
            <div>
                <div className="flex flex-col md:flex-row items-center justify-between">
                    <h2 className="text-2xl font-semibold mb-2">
                        {chapter.title}
                    </h2>
                    {purchase ? (
                        <div>

                       
                       { /*TODO Add Course Progress Button*/}
                       
                        </div>
                    ) : (
                        <CourseEnrollButton
                            courseID={params.courseId}
                            price={course.price!}
                        />
                    )}
                </div>
                <Separator />
                <div>
                    <Preview value={chapter.description!} />
                </div>
                {!!attachments.length && (
                    <>
                    <Separator />
                    <div className="p-4">
                        {attachments.map((attachment) => (
                            <a
                            href={attachment.url}
                            target="_blank"
                            key={attachment.id}
                            className="flex items-center p-3 w-full bg-sky-200 border text-sky-700 rounded-md hover:underline"
                            >
                                <FileIcon/>
                                <p className="line-clamp-1">
                                    {attachment.name}
                                </p>
                                
                            </a>
                        ))}
                    </div>
                    </>
                )}
            </div>
        </div>
      </div>
    );
}

export default ChapterIdPage;