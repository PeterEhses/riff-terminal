
find . -name "*.mp4" -type f | rename 's/ /_/g'
find . -name "*.mp3" -type f | rename 's/ /_/g'
mkdir --parents ./conversion_source_files; 
for i in *.mp4
do 
	echo "TESTING FOR FILE"
	echo ${i%.*}
	if [ -f "${i%.*}.mp3" ]
	then
		echo "MP3 FOUND"
		ffmpeg -i ${i%.*}.mp4 -i ${i%.*}.mp3 -c:v libx264 -crf 1 -preset veryfast -b:v 6000k -maxrate:v 6600k -bufsize:v 8000k -map 0:v:0 -map 0:a:0 -map 1:a:0 -c:a aac -b:a 128k -ac 2 -f hls -hls_time 2 -hls_playlist_type event -hls_flags independent_segments -g 29 -sc_threshold 0 -var_stream_map "v:0,agroup:main a:0,name:German,language:de,agroup:main,default:yes a:1,name:English,language:en,agroup:main" -master_pl_name ${i%.*}_master.m3u8 -hls_segment_filename data_${i%.*}_%v/part%03d.ts -use_localtime_mkdir 1 stream_${i%.*}_%v.m3u8;
		mv ${i%.*}.mp3 ./conversion_source_files;
	else
		echo "ONLY MP4 FOUND"
		ffmpeg -i ${i%.*}.mp4 -c:v libx264 -crf 1 -preset veryfast -b:v 6000k -maxrate:v 6600k -bufsize:v 8000k -map 0:v:0 -map 0:a:0 -c:a aac -b:a 128k -ac 2 -f hls -hls_time 2 -hls_playlist_type event -hls_flags independent_segments -g 29 -sc_threshold 0 -var_stream_map "v:0,agroup:main a:0,name:German,language:de,agroup:main,default:yes" -master_pl_name ${i%.*}_master.m3u8 -hls_segment_filename data_${i%.*}_%v/part%03d.ts -use_localtime_mkdir 1 stream_${i%.*}_%v.m3u8;
	fi
	mv ${i%.*}.mp4 ./conversion_source_files
	echo "DONE"
done
